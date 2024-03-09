import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

export const Login = (props) => {
  const [credential, setCredential] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${env.process.REACT_APP_BASE_URI}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": process.env.REACT_APP_AUTH_TOKEN,
        },

        body: JSON.stringify({
          email: credential.email,
          password: credential.password,
        }),
      }
    );

    const json = await response.json();
    console.log(json);

    if (json.success) {
      //redirect
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Logged in", "success");
      navigate("/Dashboard");
    } else {
      props.showAlert("Invalid details", "danger");
    }
  };

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="card container">
        <div className="row justify-content-center align-items-center vh-80">
          <form onSubmit={handleSubmit} className="col-md-6">
            <div className="card-header">
              <h2
                className="text-uppercase text-center mb-5"
                style={{ color: "green" }}
              >
                Admin Login{" "}
              </h2>
            </div>
            <div className="card-body">
              {" "}
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="form-label"
                  style={{ color: "green" }}
                >
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={credential.email}
                  onChange={onChange}
                  placeholder="Enter email"
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="form-label"
                  style={{ color: "green" }}
                >
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  onChange={onChange}
                  value={credential.password}
                  id="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Check me out
                </label>
              </div>
            </div>
            <div className="card-footer text-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
