import React, { useEffect, useState } from "react";
import "./AddProduct.css";

import "animate.css";

import { auth, db, storage } from "../firebaseConfig/Firebase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  function GetCurrentUser() {
    const [user, setUser] = useState("");
    const userCollectionRef = collection(db, "users");

    useEffect(() => {
      auth.onAuthStateChanged((userlogged) => {
        if (userlogged) {
          const getUsers = async () => {
            const q = query(
              collection(db, "users"),
              where("uid", "==", userlogged.uid)
            );
            // console.log(q);
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            // console.log(data.docs);
          };
          getUsers();
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }

  const loggedUser = GetCurrentUser();

  const [productTitle, setProductTitle] = useState("");
  const [productType, setProductType] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [customerSupport, setCustomerSupport] = useState("");
  const [price, setPrice] = useState("");
  const [warranty, setWarranty] = useState("");
  const [productImage, setProductImage] = useState("");

  const [imageError, setImageError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [uploadError, setUploadError] = useState("");

  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];

  const handleProductImg = (e) => {
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setProductImage(selectedFile);
        setImageError("");
      } else {
        setProductImage(null);
        setImageError("Please Select A Valid File Image Type(png or jpg");
      }
    } else {
      setImageError("Please Select Your File");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storageRef = ref(
      storage,
      `product-images${brand.toUpperCase()}/${Date.now()}`
    );
    console.log(storageRef._location.path);

    // uploading photo into storage
    uploadBytes(storageRef, productImage).then(() => {
      // and getting its url
      getDownloadURL(storageRef).then((url) => {
        // and connecting storage with firestore
        addDoc(collection(db, `products-${brand.toUpperCase()}`), {
          productTitle,
          productImage: url,
          description,
          brand,
          price,
          customerSupport,
        });
      });
    });
  };

  return (
    <div className="add_product_container">
      {loggedUser && loggedUser[0].email == "yoyo@gmail.com" ? (
        <div className="add_product">
          <form onSubmit={handleSubmit} className="addproduct_form">
            <h2 style={{ textAlign: "center" }}>Add Product</h2>
            {successMsg && (
              <>
                <div className="success-msg">{successMsg}</div>
              </>
            )}
            {uploadError && (
              <>
                <div className="error-msg">{uploadError}</div>
              </>
            )}
            <div className="register-form-data">
              <label for="product_title">Product Title</label>
              <input
                onChange={(e) => setProductTitle(e.target.value)}
                type="text"
                placeholder="Product Title"
                id="product_title"
              />
            </div>
            {/* <div className="register-form-data">
              <label for="product_type">Product Type</label>
              <input
                onChange={(e) => setProductType(e.target.value)}
                type="text"
                placeholder="Product Type"
                id="product_type"
              />
            </div> */}
            <div className="register-form-data">
              <label for="brand">Brand</label>
              <input
                onChange={(e) => setBrand(e.target.value)}
                type="text"
                placeholder="Brand"
                id="brand"
              />
            </div>

            <div className="register-form-data">
              <label for="image" l>
                Image
              </label>
              <input
                onChange={handleProductImg}
                type="file"
                placeholder="Image"
                id="image"
              />

              {imageError && (
                <>
                  <div className="error-msg">{imageError}</div>
                </>
              )}
            </div>
            <div className="register-form-data">
              <label for="description">Description</label>
              <input
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="Describe Your Product"
                id="description"
              />
            </div>
            <div className="register-form-data">
              <label for="price">Price</label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                type="text"
                placeholder="Price"
                id="price"
              />
            </div>
            <div className="register-form-data">
              <label for="customer">Customer Support</label>
              <input
                onChange={(e) => setCustomerSupport(e.target.value)}
                type="text"
                placeholder="Customer Support Email,PhoneNO."
                id="customer"
              />
            </div>

            <button type="submit">Add</button>
          </form>
        </div>
      ) : (
        <div className="addprod_container_not">
          <div className="not-allowed">Not Allowed</div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
