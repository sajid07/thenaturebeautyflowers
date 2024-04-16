const Busboy = require("busboy");
const aws = require("aws-sdk");

const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
const region = process.env.REACT_APP_AWS_REGION;
const bucket = process.env.REACT_APP_AWS_BUCKET;
const bucketUri = process.env.REACT_APP_AWS_BUCKET_URI;

const Products = require("../models/Product");
const Projects = require("../models/Project");

const s3 = new aws.S3({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region,
}); // Creating an S3 client with AWS credentials

const uploadToS3 = async (fileKey, fileData, contentType) => {
  const params = {
    Bucket: bucket,
    Key: fileKey,
    Body: fileData,
    ContentType: contentType,
  };

  return new Promise((resolve, reject) => {
    const upload = s3.upload(params);

    upload.on("httpUploadProgress", (progress) => {
      console.log(`Uploaded ${progress.loaded} out of ${progress.total} bytes`);
    });

    upload.send((err, data) => {
      if (err) {
        console.error("Upload failed:", err.message);
        reject(err);
      } else {
        console.log("Upload succeeded:", data.Location);
        resolve(data.Location);
      }
    });
  });
};

const deleteFilesFromS3 = async (fileKeys) => {
  // Specify the common prefix to be removed
  const prefixToRemove = bucketUri;

  // Create an array to hold objects to delete
  const objectsToDelete = fileKeys.map((fileKey) => {
    const keyWithoutPrefix = fileKey.replace(prefixToRemove, "");
    return { Key: keyWithoutPrefix };
  });

  // Specify the parameters for deleting multiple objects from S3
  const deleteParams = {
    Bucket: bucket,
    Delete: {
      Objects: objectsToDelete,
      Quiet: false, // Set to true to suppress errors if some objects cannot be deleted
    },
  };

  try {
    // Attempt to delete multiple objects from S3
    console.log(deleteParams);
    const data = await s3.deleteObjects(deleteParams).promise();
    console.log("Files deleted successfully:", data);
  } catch (error) {
    console.error("Error deleting files from S3:", error);
  }
};

// Upload picture and PDF file to S3
const awsS3UploadMiddleware = async (req, res, next) => {
  if (!req.is("multipart/form-data")) {
    return next(new Error("Invalid Content Type"));
  }

  const body = new FormData();

  var busboy;

  try {
    busboy = Busboy({ headers: req.headers });
  } catch (err) {
    return next(err);
  }

  const pendingUploads = [];

  // handle text field data
  busboy.on("field", (fieldname, value) => body.append(fieldname, value));

  // handle files
  busboy.on("file", async (fieldname, file, info) => {
    const isPic = fieldname === "picture";
    const timestamp = Date.now();
    const fileKey = `pool/${
      isPic && req.originalUrl.includes("category")
        ? "categories"
        : isPic && req.originalUrl.includes("project")
        ? "projects"
        : isPic
        ? "images"
        : "pdf"
    }/${timestamp}_${info.filename}`;

    try {
      pendingUploads.push(
        uploadToS3(fileKey, file, info.mimetype).then((fileUrl) =>
          body.append(fieldname, fileUrl)
        )
      );
    } catch (error) {
      return next(error);
    }
  });

  // update request body with urls of uploaded files
  busboy.on("close", () =>
    Promise.all(pendingUploads).then(() => {
      const reqBody = {};
      body.forEach((value, key) => (reqBody[key] = value));
      req.body = reqBody;

      req.unpipe(busboy);
      busboy.removeAllListeners();

      next();
    })
  );

  req.pipe(busboy);
};

// Delete picture and PDF file from S3
const awsS3DeleteMiddleware = async (req, res, next) => {
  try {
    var itemToDelete = null;
    const s3FileKeysToDelete = [];

    if (req.originalUrl.includes("project")) {
      itemToDelete = await Projects.findById(req.params.projectId);
    } else {
      itemToDelete = await Products.findById(req.params.productId);
    }

    if (!itemToDelete) {
      throw new Error("Item not found in database");
    }

    s3FileKeysToDelete.push(itemToDelete.picture);
    if (itemToDelete.pdfFile) {
      s3FileKeysToDelete.push(itemToDelete.pdfFile);
    }

    await deleteFilesFromS3(s3FileKeysToDelete);

    next();
  } catch (err) {
    return next(err);
  }
};

module.exports = { awsS3UploadMiddleware, awsS3DeleteMiddleware };
