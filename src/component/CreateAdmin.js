import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const CreateAdmin = (props) => {
  const [credential, setCredential] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: API Call
    // API Call
    const response = await fetch(
      `${env.process.BASE_URI}/api/auth/createuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credential.name,
          email: credential.email,
          password: credential.password,
        }),
      }
    );
    const json = await response.json();
    if (response.status === 400) {
      props.showAlert("Invalid Credential", "Danger");
    } else {
      // Handle a successful response
      localStorage.setItem("token", json.authtoken);
      navigate("/login");
      props.showAlert("Account Created Successfully", "success");
    }
  };
  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  const backgroundStyle = {
    backgroundImage: `url(${"/img/banner/out.jpg"})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    filter: "blur(0px)",
  };

  return (
    <>
      <div style={backgroundStyle}></div>

      <section className="vh-100 bg-image">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card">
                  <div className="card-body p-5">
                    <h2
                      className="text-uppercase text-center mb-5"
                      style={{ color: "green" }}
                    >
                      Create an account
                    </h2>

                    <form onSubmit={handleSubmit}>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={credential.name}
                          onChange={onChange}
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="form3Example1cg">
                          Your Name
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={credential.email}
                          onChange={onChange}
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="form3Example3cg">
                          Your Email
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={credential.password}
                          onChange={onChange}
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="form3Example4cg">
                          Password
                        </label>
                      </div>

                      <button type="submit" className="btn btn-primary">
                        Resgister
                      </button>

                      <p className="text-center text-muted mt-5 mb-0">
                        Have already an account?{" "}
                        <a href="#!" className="fw-bold text-body">
                          <u>Login here</u>
                        </a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </section>
    </>
  );
};

export default CreateAdmin;
