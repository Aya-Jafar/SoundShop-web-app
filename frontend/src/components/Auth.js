import React, { useState } from "react";
import { Link } from "react-router-dom";
import BASEURL from "../urls";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic with the entered email and password
    // console.log('Login:', email, password);
    console.log(localStorage);

    fetch(`${BASEURL}/auth/login/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        // if (result.email !== null && result.password !== null) {
        const { access } = result.token;

        setEmail(result.email);
        setPassword(result.password);
        localStorage.setItem("token", access);
        // console.log(localStorage);

        navigate("/");
        // }
      })
      .catch((error) => {
        toast.error("An error occurred while logging in!");
      });
  };

  return (
    <section
      className="vh-50 d-flex align-items-center"
      style={{
        backgroundColor: "linear-gradient(to bottom, #e6e6e6, #cccccc)",
      }}
    >
      <div className="container-lg py-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-6">
            <div
              className="card shadow-2-strong"
              style={{
                borderRadius: 0,
                width: "500px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.332)",
              }}
            >
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">Sign in</h3>
                <div className="form-outline mb-4">
                  <input
                    value={email || ""} // Ensure email is not undefined
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="typeEmailX-2"
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="typeEmailX-2">
                    Email
                  </label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="typePasswordX-2"
                    className="form-control form-control-lg"
                    value={password || ""} // Ensure password is not undefined
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="form-label" htmlFor="typePasswordX-2">
                    Password
                  </label>
                </div>
                <button
                  className="btn btn-primary btn-lg btn-block btn-dark mb-3 rounded-0"
                  style={{ width: "200px" }}
                  type="submit"
                  onClick={handleLogin}
                >
                  Login
                </button>
                <hr className="my-4" />
                <button
                  className="btn btn-lg btn-block btn-primary mb-2 rounded-0"
                  style={{
                    backgroundColor: "#dd4b39",
                    width: "300px",
                    borderColor: "#dd4b39",
                  }}
                  type="submit"
                >
                  <i className="fab fa-google me-2"></i>
                  Sign in with Google
                </button>
                <button
                  className="btn btn-lg btn-block btn-primary rounded-0"
                  style={{ backgroundColor: "#3b5998", width: "300px" }}
                  type="submit"
                  >
                    <i className="fab fa-facebook-f me-2"></i> Sign in with
                    Facebook
                </button>
              </div>
              <p className="mt-3">
                Don't have an account? <Link to="/register">Register here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
