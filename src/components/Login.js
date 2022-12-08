import "./Login.css";
import "./Register.css";

import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ErrorRounded } from "@mui/icons-material";
import { auth, db } from "../firebaseConfig/Firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSuccessMsg(
          "Logged in successfully, you will be redirected to Home page"
        );
        setEmail("");
        setPassword("");
        setErrorMsg("");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        // console.log(error.message);

        // if (ErrorRounded.message == "Firebase: Error (auth/invalid-email).") {
        //   setErrorMsg("Please fill all details");
        // }
        // if (ErrorRounded.message == "Firebase: Error (auth/user-not-found).") {
        //   setErrorMsg("Email nOt Found");
        // }
        // if (ErrorRounded.message == "Firebase: Error (auth/wrong-password).") {
        //   setErrorMsg("Wrong Password");
        // }
        setErrorMsg("Something Is Wrong");
      });
  };
  return (
    <div className="registerpage">
      <div className="register">
        <form onSubmit={handleSubmit} className="register-form">
          <h2 style={{ textAlign: "center" }}>Login</h2>
          {successMsg && (
            <>
              <div className="success-msg">{successMsg}</div>
            </>
          )}
          {errorMsg && (
            <>
              <div className="error-msg">{errorMsg}</div>
            </>
          )}

          <div className="register-form-data">
            <label for="email" l>
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              id="email"
            />
          </div>
          <div className="register-form-data">
            <label for="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              id="password"
            />
          </div>

          <button type="submit">Login</button>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "0 0 0 1rem",
            }}
          >
            <span style={{ color: "#fd1d1d" }}>Dont have an account?</span>
            <Link to="/register" style={{ fontWeight: "500", color: "black" }}>
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
