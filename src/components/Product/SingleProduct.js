import { CommitSharp } from "@mui/icons-material";
import { getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { auth, db } from "../../firebaseConfig/Firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  addDoc,
} from "firebase/firestore";
import ProductSliders from "./ProductSlider";
import "./SingleProduct.css";

const SingleProduct = () => {
  const { id, brand } = useParams();

  const [product, setProduct] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [user, setUser] = useState("");

  function GetCurrentUser() {
    useEffect(() => {
      auth.onAuthStateChanged((userlogged) => {
        if (userlogged) {
          const getUsers = async () => {
            const q = query(
              collection(db, "users"),
              where("uid", "==", userlogged.uid)
            );
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };
          getUsers();
        } else {
          setUser(null);
        }
      });
    }, [user]);
    return user;
  }
  const loggedUser = GetCurrentUser();

  function GetCurrentProduct() {
    useEffect(() => {
      const getProducts = async () => {
        const docRef = doc(db, `products-${brand.toUpperCase()}`, id);
        const docSnap = await getDoc(docRef);
        setProduct(docSnap.data());
      };
      getProducts();
    }, []);
    return product;
    console.log(product);
  }
  GetCurrentProduct();

  let mrp = parseInt(product.price);
  const discount_price = parseInt(mrp - (10 / 100) * mrp);
  const save = parseInt(mrp - discount_price);

  const addToCart = () => {
    if (loggedUser) {
      addDoc(collection(db, `cart-${loggedUser[0].uid}`), {
        product,
        quantity: 1,
      })
        .then(() => {
          setSuccessMsg("Product Added To Cart");
        })
        .catch((error) => {
          setErrorMsg(error.message);
        });
    } else {
      setErrorMsg("You Need To Logged In");
    }
  };

  return (
    <div className="single_prod_cont">
      {product ? (
        <div className="main_single">
          <div style={{ textAlign: "center" }} className="heading">
            {product.productTitle}
          </div>
          <div className="single_prod">
            <div className="left">
              <img src={product.productImage} width="45rem" height="45rem" />
              <div style={{ color: "red" }} className="prod_price">
                MRP:₹
                <span style={{ color: "black" }} className="oprice">
                  {product.price}
                </span>
              </div>

              <div style={{ color: "green" }} className="prod_price">
                Discount MRP:₹
                <span style={{ color: "black" }} className="dprice">
                  {discount_price}
                </span>
              </div>
              <div style={{ color: "#114bb6" }} className="prod_price">
                You Save MRP:₹
                <span style={{ color: "black" }} className="sprice">
                  {save}
                </span>
              </div>
            </div>
            <div className="right">
              <div className="description">
                <h3>Description:</h3>
                {product.description}
              </div>
              {/* <div className="comments">comments</div> */}
              <div className="customerSupport">
                <h3>Customer Support:</h3>
                {product.customerSupport}
              </div>
              <div className="brand">
                <h3>Brand:</h3>
                <span>{product.brand}</span>
              </div>
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

              <div className="buttons">
                {/* <div className="btn">Buy Now</div> */}
                <div onClick={addToCart} className="btn">
                  Add To Cart
                </div>
              </div>
              <div className="buttons2">
                {/* <div className="btn">Buy Now</div> */}
                <div onClick={addToCart} className="btn">
                  Add To Cart
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <div className="sliders">
        <h3 style={{ textAlign: "center" }}>Similar Product</h3>
        <ProductSliders type={brand} />
      </div>
    </div>
  );
};

export default SingleProduct;
