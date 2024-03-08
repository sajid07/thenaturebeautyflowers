import React, { useContext, useState } from "react";

import ProductContext from "./productContext";

const aws = require("aws-sdk");

const ProductState = (props) => {
  const host = "http://localhost:5000";
  const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
  const region = process.env.REACT_APP_AWS_REGION;
  const productInitial = []; // or fetch it from the server
  const [projects, setProjects] = useState([]);
  const [products, setProducts] = useState(productInitial);

  const [product, setProduct] = useState(null); // Add this line
  console.log(product);
  const uploadToS3 = async (fileKey, fileData, contentType) => {
    const s3 = new aws.S3({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      region: region,
    });
  
    const params = {
      Bucket: "thenaturebeautyflower",
      Key: fileKey,
      Body: fileData,
      ContentType: contentType,
    };
  
    return new Promise((resolve, reject) => {
      const upload = s3.upload(params);
      
      upload.on('httpUploadProgress', (progress) => {
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
  
  // add product
  const addProduct = async (product) => {
    const pictureKey = `pool/images/${
      product.picture.name
    }`;
    const pdfKey = `pool/pdf/${
      product.pdfFile.name
    }`;

    // Upload picture and PDF file to S3
    const pictureUrl = await uploadToS3(
      pictureKey,
      product.picture,
      product.picture.type
    );
    const pdfUrl = await uploadToS3(
      pdfKey,
      product.pdfFile,
      product.pdfFile.type
    );

    //   // Now, add the product with both URLs to your database

    const productData = {
      name: product.name,
      description: product.description,
      category: product.category,
      picture: pictureUrl,
      pdfFile: pdfUrl,
    };

    // Now, add the product with both URLs to your database
    try {
      const response = await fetch(`${host}/api/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(productData), // Change to productData directly
      });

      const data = await response.json(); // Parse the response as JSON

      console.log("Product added successfully:", data);
      alert("Product added successfully");
    } catch (error) {
      console.error("Error adding product:", error);
      // Handle error and provide user feedback
      throw error;
    }
  };
  //add Project
  const addProject = async (product) => {
    const pictureKey = `pool/projects/${
      product.picture.name
    }`;
    

    // Upload picture and PDF file to S3
    const pictureUrl = await uploadToS3(
      pictureKey,
      product.picture,
      product.picture.type
    );
    

    //   // Now, add the product with both URLs to your database

    const productData = {
      name: product.name,
      description: product.description,
      picture: pictureUrl,
    };

    // Now, add the product with both URLs to your database
    try {
      const response = await fetch(`${host}/api/project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(productData), // Change to productData directly
      });

      const data = await response.json(); // Parse the response as JSON

      console.log("project added successfully:", data);
      alert("project added successfully");
    } catch (error) {
      console.error("Error adding project:", error);
      // Handle error and provide user feedback
      throw error;
    }
  };
  //fetch Product

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${host}/api/product/fetchallproducts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      console.log("Fetched Data:", json);
      setProducts(json);
    } catch (error) {
      console.error("Error Fetching Data:", error);
    }
  };
  //fetch_username
  const fetchUserName = async () => {
    try {
      const response = await fetch(`${host}/api/user/user-info`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        const userInfo = await response.json();
        const userName = userInfo ? userInfo.name : null;
        return userName;
      } else {
        console.error("Error fetching user information:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
      return null;
    }
  };

  // delete product
  // Modify the deleteProduct function in ProductState.js
  const deleteProduct = async (productId) => {
    try {
      // Fetch the product details before deleting
      const productToDelete = products.find(
        (product) => product._id === productId
      );

      // Implement the actual deleteProduct functionality
      await fetch(`${host}/api/product/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),

        },
      });

      // After successful deletion, delete the files from S3
      const s3FileKeys = [productToDelete.picture, productToDelete.pdfFile];
      await deleteFilesFromS3(s3FileKeys);

      // Fetch the updated product list
      await fetchProduct();

      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };



  // DELETE PROJECT
  const deleteProject = async (projectId, projects) => {
    try {
      const projectToDelete = projects.find((project) => project._id === projectId);
      if (!projectToDelete) {
        throw new Error('Project not found');
      }
      // Implement the actual deleteProject functionality
      await fetch(`${host}/api/project/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const s3FileKeys = [projectToDelete.picture];
      await deleteFilesFromS3(s3FileKeys);
      console.log("Project deleted successfully");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };
  
  // Add this function to your ProductState.js
//   const deleteFilesFromS3 = async (fileKeys) => {
//     // Creating an S3 client with AWS credentials
//     const s3 = new aws.S3({
//         accessKeyId: accessKeyId,
//         secretAccessKey: secretAccessKey,
//         region: region,
//     });

//     // Specify the common prefix to be removed
//     const prefixToRemove = "https://thenaturebeautyflower.s3.ap-south-1.amazonaws.com/";

//     // Iterate through fileKeys and delete each file from S3
//     for (const fileKey of fileKeys) {
//         // Remove the specified prefix from the file key
//         const keyWithoutPrefix = fileKey.replace(prefixToRemove, "");

//         // Specify the parameters for deleting an object from S3
//         const deleteParams = {
//             Bucket: "thenaturebeautyflower",
//             Key: keyWithoutPrefix,
//         };

//         console.log("File Key:");
//         console.log(keyWithoutPrefix); // Check if the prefix is removed correctly

//         try {
//             // Attempt to delete the object from S3
//             console.log("File is going to be deleted:", keyWithoutPrefix);
//             s3.deleteObject(deleteParams, (error, data) => {
//               console.log(`File deleted successfully: ${keyWithoutPrefix}`, data);

//           })            
//         } catch (error) {
//             console.error(`Error deleting file from S3: ${keyWithoutPrefix}`, error);
//         }
//     }
// };
const deleteFilesFromS3 = async (fileKeys) => {
  // Creating an S3 client with AWS credentials
  const s3 = new aws.S3({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      region: region,
  });

  // Specify the common prefix to be removed
  const prefixToRemove = "https://thenaturebeautyflower.s3.ap-south-1.amazonaws.com/";

  // Create an array to hold objects to delete
  const objectsToDelete = fileKeys.map(fileKey => {
      const keyWithoutPrefix = fileKey.replace(prefixToRemove, "");
      return { Key: keyWithoutPrefix };
  });

  // Specify the parameters for deleting multiple objects from S3
  const deleteParams = {
      Bucket: "thenaturebeautyflower",
      Delete: {
          Objects: objectsToDelete,
          Quiet: true // Set to true to suppress errors if some objects cannot be deleted
      }
  };

  try {
      // Attempt to delete multiple objects from S3
      const data = await s3.deleteObjects(deleteParams).promise();
      console.log("Files deleted successfully:", data);
  } catch (error) {
      console.error("Error deleting files from S3:", error);
  }
};


  // edit product
  // Inside your ProductState.js or wherever your context logic is

  const editProduct = async (updatedProductData) => {
    try {
      // API Call
      const response = await fetch(
        `${host}/api/product/${updatedProductData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(updatedProductData),
        }
      );

      if (response.ok) {
        // Assuming your backend returns the updated product data
        const updatedProduct = await response.json();
        console.log(updatedProduct);

        // Use the functional form of setProducts to ensure you have the latest state
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === updatedProductData._id
              ? { ...product, ...updatedProductData }
              : product
          )
        );
      } else {
        console.error("Failed to update product:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Adjust the function according to your backend API and state management logic
  const updateContacts = async (newWhatsAppContact, newCallContact) => {
    try {
      // Update MongoDB using Mongoose
      const ContactData = {
        callContact: newCallContact,
        whatsappContact: newWhatsAppContact,
      };

      // Now, add the product with both URLs to your database
      try {
        const response = await fetch(`${host}/api/contacts/update-contacts`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),

          },
          body: JSON.stringify(ContactData),
        });

        const data = await response.json(); // Parse the response as JSON

        console.log("contact added successfully:", data);
        alert("contact added successfully");
      } catch (error) {
        console.error("Error adding contact:", error);
        // Handle error and provide user feedback
        throw error;
      }
    } catch (error) {
      console.error("Error updating contacts:", error);
      // Handle other errors if any
      throw error;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        updateContacts,
        addProduct,
        fetchUserName,
        deleteProduct,
        deleteProject,
        editProduct,
        fetchProduct,
        setProduct,
        addProject
       
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
export { ProductContext }; // Export the context directly

// You can also define the useProduct hook here if needed
export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
