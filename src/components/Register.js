import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../firebaseConfig/Firebase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    // console.log(userName);
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      // from above statement user is formed
      .then((userCredential) => {
        const user = userCredential.user;
        const initialcartvalue = 0;
        console.log(user);

        addDoc(collection(db, "users"), {
          username: userName,
          email: email,
          password: password,
          cart: initialcartvalue,
          address: address,
          pno: phoneNo,
          uid: user.uid,
        })
          .then(() => {
            setSuccessMsg(
              "New User Added Sussefully ,You Will Now Be Automatically Redirected To Login Page"
            );
            setUserName("");
            setPassword("");
            setEmail("");
            setPhoneNo("");
            setAddress("");
            setErrorMsg("");
            setTimeout(() => {
              setSuccessMsg("");
              navigate("/login");
            }, 4000);
          })
          .catch((error) => {
            setErrorMsg(error.message);
          });
      })
      .catch((error) => {
        if (error.message == "Firebase: Error (auth/invaid-email).") {
          setErrorMsg("Please Fill all required fields");
        }
        if (error.message == "Firebase: error (Auth/email-already-in-use).") {
          setErrorMsg("User already Exists");
        }
      });
  };
  return (
    <div className="registerpage">
      <div className="register">
        <form onSubmit={handleSubmit} className="register-form">
          <h2 style={{ textAlign: "center" }}>Create Account</h2>
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
            <label for="name">Name</label>
            <input
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="Name"
              id="name"
            />
          </div>
          <div className="register-form-data">
            <label for="mobileno">Mobile No.</label>
            <input
              onChange={(e) => setPhoneNo(e.target.value)}
              type="text"
              placeholder="Mobile No."
              id="mobileno"
            />
          </div>
          <div className="register-form-data">
            <label for="address">Address</label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="Address"
              id="address"
            />
          </div>
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

          <button type="submit">Register</button>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "0 0 0 1rem",
            }}
          >
            <span style={{ color: "#fd1d1d" }}>Already have an Account?</span>
            <Link to="/login" style={{ fontWeight: "500", color: "black" }}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
