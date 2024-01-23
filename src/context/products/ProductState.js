import React, { useContext, useState } from "react";

import ProductContext from "./productContext";

const aws = require("aws-sdk");

const ProductState = (props) => {
  const host = "http://localhost:5000";
  const accessKeyId = "AKIA3TKWYLERS7CQ3OKM";
  const secretAccessKey = "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";
  const region = "ap-south-1";
  const productInitial = []; // or fetch it from the server
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
    const pictureKey = `pool/images/${product.name}-${Date.now()}-${
      product.picture.name
    }`;
    const pdfKey = `pool/pdf/${product.name}-${Date.now()}-${
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
    const pictureKey = `pool/projects/${product.name}-${Date.now()}-${
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

  // Add this function to your ProductState.js
  const deleteFilesFromS3 = async (fileKeys) => {
    // Creating an S3 client with AWS credentials
    const s3 = new aws.S3({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      region: region,
    });

    // Specify the common prefix to be removed
    const prefixToRemove =
      "https://thenaturebeautyflower.s3.ap-south-1.amazonaws.com/";

    // Iterate through fileKeys and delete each file from S3
    for (const fileKey of fileKeys) {
      // Remove the specified prefix from the file key
      const keyWithoutPrefix = fileKey.replace(prefixToRemove, "");

      // Determine the appropriate prefix based on the file type
      const fileTypePrefix = fileKey.includes("images/") ? "images/" : "pdf/";

      // Add the fileTypePrefix to the filename
      const fileName = `${fileTypePrefix}${keyWithoutPrefix.split("/").pop()}`;

      // Specify the parameters for deleting an object from S3
      const params = {
        Bucket: "thenaturebeautyflower",
        Key: keyWithoutPrefix,
        VersionId: "null",
      };

      console.log(fileName);

      try {
        // Attempt to delete the object from S3
        await s3.deleteObject(params).promise();
        console.log(`File deleted successfully: ${fileKey}`);
      } catch (error) {
        console.error(`Error deleting file from S3: ${fileKey}`, error);
      }
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
