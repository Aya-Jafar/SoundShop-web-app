import React, { useState } from "react";
import { Link } from "react-router-dom";
import BASEURL from "../urls";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  // const notify = () => toast("Wow so easy!");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // if (password === confirmPassword && password !== null){

  // }
  const handleRegister = (e) => {
    e.preventDefault();
    // Perform registration logic with the entered data
    console.log("Register:", username, email, password, phoneNumber);

    fetch(`${BASEURL}/auth/signup/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: username,
        email: email,
        password1: password,
        password2: confirmPassword,
        phone_number: phoneNumber,
      }),
    })
      // {
      //   "user_name": "jane_smith",
      //   "email": "jane.smith@example.com",
      //   "phone_number": "9876543210",
      //   "password1": "securepassword",
      //   "password2": "securepassword"
      //   }
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        localStorage.setItem("token", result.token);
        console.log(localStorage.getItem("token"));
        // navigate('/');
      })
      .catch((error) => {
        toast.error("An error occurred while registering!");
      });
  };

  return (
    <section
      className="d-flex align-items-center"
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
                <h3 className="mb-5">Register</h3>
                <div className="form-outline mb-4">
                  <input
                    // value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    id="typeUsernameX"
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="typeUsernameX">
                    Username
                  </label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    // value={" "}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="typeEmailX"
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="typeEmailX">
                    Email
                  </label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    // value={" "}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="typePasswordX"
                    className="form-control form-control-lg"
                    required
                    minLength="8"
                  />
                  <label className="form-label" htmlFor="typePasswordX">
                    Password
                  </label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    // value={" "}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    id="typeConfirmPasswordX"
                    className="form-control form-control-lg"
                  />
                  <label className="form-label">Confirm Password</label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    // value={" "}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    type="tel"
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="typePasswordX">
                    Phone Number
                  </label>
                </div>
                <button
                  className="btn btn-primary btn-lg btn-block btn-dark mb-3 rounded-0"
                  style={{ width: "200px" }}
                  type="submit"
                  onClick={handleRegister}
                >
                  Register
                </button>
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
                  Sign up with Google
                </button>
                <button
                  className="btn btn-lg btn-block btn-primary mb-3 rounded-0"
                  style={{ backgroundColor: "#3b5998", width: "300px" }}
                  type="submit"
                >
                  <i className="fab fa-facebook-f me-2"></i> Sign up with
                  Facebook
                </button>
                <p className="mt-2">
                  Already have an account? <Link to="/login">Login here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
