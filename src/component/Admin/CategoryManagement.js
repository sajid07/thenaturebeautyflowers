import React, { useContext, useState, useRef } from "react";
import * as formik from "formik";
import * as yup from "yup";
import { useDebouncedCallback } from "use-debounce";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import productContext from "../../context/products/productContext";
import CategoryList from "./CategoryList";

const CategoryManagement = () => {
  const context = useContext(productContext);
  const host = process.env.REACT_APP_BASE_URI;
  const { addCategory } = context || {};

  const checkDuplicateCategory = useDebouncedCallback(
    async (categoryName, resolve, reject) => {
      try {
        const response = await fetch(
          `${host}/api/category/exists?name=${categoryName}`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();
        resolve(!data.exists);
      } catch (error) {
        console.error("Error checking category existence:", error.message);
        reject(error);
      }
    },
    300
  );

  const categoryAdded = useRef(false);
  const formikRef = useRef();
  const [category, setCategory] = useState({
    name: "",
    picture: "",
  });

  const { Formik } = formik;
  const schema = yup.object().shape({
    name: yup
      .string()
      .nullable()
      .transform((curr, orig) => (orig === "" ? null : curr)) // convert empty string to null to skip duplicate validation check
      .required("Category Name is required.")
      .test({
        message:
          "Category with this name already exists. Please choose a different name.",
        skipAbsent: true,
        test: async (val) =>
          new Promise((resolve, reject) =>
            checkDuplicateCategory(val, resolve, reject)
          ),
      }),
    picture: yup
      .mixed()
      .nullable()
      .transform((curr, orig) => (orig === "" ? null : curr)) // convert empty string to null to skip file type and size validation check
      .required("Category Picture is required.")
      .test({
        message:
          "Please select a valid image file of size <= 100 MB as category picture.",
        test: (picture) =>
          /^image\//.test(picture.type) && picture.size <= 100000000, // 100 MB
        skipAbsent: true,
      }),
  });

  const resolveFieldValue = (e) => {
    if (!e.target.files?.length) {
      return e.target.value;
    }

    return e.target.files.length === 1 ? e.target.files[0] : e.target.files;
  };

  const handleChange = (e) => {
    e.preventDefault();

    const formik = formikRef.current;
    const field = e.target.name;
    const value = resolveFieldValue(e);

    // pass "shouldValidate" as false in both setFieldValue & setFieldTouched
    // methods to make sure that validation is run on individual fields
    // instead of the whole form whenever a form control value changes.
    formik.setFieldValue(field, value, false).then(() => {
      formik.setFieldTouched(field, true, false);
      formik.validateField(field);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formik = formikRef.current;
    const form = e.currentTarget;
    const formData = new FormData(form);

    formik.setSubmitting(true);
    await addCategory(formData);
    setCategory({
      name: "",
      picture: "",
    });
    categoryAdded.current = !categoryAdded.current; // trigger category list re-render
    formik.setSubmitting(false);
  };

  return (
    <>
      <h1 className="mt-4">Dashboard</h1>
      <div className="container my-3">
        <h2>Add Category</h2>
        <Formik
          validationSchema={schema}
          initialValues={category}
          innerRef={formikRef}
          validateOnMount
        >
          {({ touched, errors, isSubmitting, isValid, isValidating }) => (
            <Form
              className="my-3"
              encType="multipart/form-data"
              method="post"
              noValidate
              onSubmit={handleSubmit}
            >
              <Form.Group className="mb-3">
                <Form.Label htmlFor="name" className="form-label">
                  Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Category Name Here"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  isValid={!isValidating && touched.name && !errors.name}
                  isInvalid={!isValidating && touched.name && !!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="picture" className="form-label">
                  Picture
                </Form.Label>
                <Form.Control
                  type="file"
                  name="picture"
                  accept="image/*"
                  onChange={handleChange}
                  isValid={touched.picture && !errors.picture}
                  isInvalid={touched.picture && !!errors.picture}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.picture}
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                disabled={!touched || !isValid || isValidating || isSubmitting}
                type="submit"
                className="btn btn-primary"
              >
                {isSubmitting ? "Adding Category..." : "Add Category"}
              </Button>
            </Form>
          )}
        </Formik>
        <CategoryList categoryAdded={categoryAdded.current} />
      </div>
      <footer className="py-4 bg-light mt-auto">
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center justify-content-between small"></div>
        </div>
      </footer>
    </>
  );
};
export default CategoryManagement;
