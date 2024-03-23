import React, { useContext, useState } from "react";

import ProductContext from "./productContext";

const ProductState = (props) => {
  const host = process.env.REACT_APP_BASE_URI;
  const productInitial = []; // or fetch it from the server
  const [products, setProducts] = useState(productInitial);

  const [_, setProduct] = useState(null); // Add this line

  // add product
  const addProduct = async (product) => {
    try {
      const response = await fetch(`${host}/api/product`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
        body: product,
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
    try {
      const response = await fetch(`${host}/api/project`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
        body: product,
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
      // Implement the actual deleteProduct functionality
      await fetch(`${host}/api/product/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      // Fetch the updated product list
      await fetchProduct();

      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // DELETE PROJECT
  const deleteProject = async (projectId) => {
    try {
      // Implement the actual deleteProject functionality
      await fetch(`${host}/api/project/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      alert("Project deleted successfully");

      console.log("Project deleted successfully");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  // edit product
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
        addProject,
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
