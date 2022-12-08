import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./cart.css";
import { auth, db } from "../firebaseConfig/Firebase";
import StripeCheckout from "react-stripe-checkout";
import {
  collection,
  getDocs,
  query,
  QuerySnapshot,
  where,
  addDoc,
} from "firebase/firestore";

import CartData from "./CartData";

const Cart = () => {
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

  const [cartdata, setCartdata] = useState([]);

  if (loggedUser) {
    const getcartdata = async () => {
      const cartArray = [];
      const path = `cart-${loggedUser[0].uid}`;
      getDocs(collection(db, path))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            cartArray.push({ ...doc.data(), id: doc.id });
          });
          setCartdata(cartArray);
        })
        .catch("Error");
    };
    getcartdata();
  }

  const qty = cartdata.map((cartdata) => {
    return cartdata.quantity;
  });

  const reducerofQty = (accumulator, currentValue) =>
    accumulator + currentValue;

  const totalQty = qty.reduce(reducerofQty, 0);

  const mrps = cartdata.map((cartdata) => {
    return cartdata.product.price * cartdata.quantity;
  });
  // console.log(mrps);

  const totalPrice = mrps.reduce(reducerofQty, 0);

  const handleToken = () => {
    console.log("payment");
  };

  return (
    <div className="cart_cont">
      {cartdata.length != 0 ? (
        <div className="main_cont">
          <div className="cart_header">Your Cart Items</div>
          <div className="cart_items">
            {cartdata?.map((item) => {
              return (
                <>
                  <CartData
                    key={item?.id}
                    item={item}
                    userId={loggedUser[0].uid}
                  />
                </>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="empty_cart">Cart Is Empty</div>
      )}
      {cartdata.length != 0 && (
        <>
          <div className="proceed">
            <div className="summary_card">
              <div className="summary_heading">Cart Summary</div>
              <div className="total_prod">
                Total Product: <b>{totalQty}</b>
              </div>
              <div className="total_amt">Total Amount: ₹{totalPrice}</div>
              <div className="pay">
                <StripeCheckout
                  stripeKey="pk_test_51MBvNWSHSLA0eDYAHPlDlwC4Fp1xr1Ogqt6fZnFpmCkcM3PQyFGZUUhAYz9hXIrwj0upHMc2RSvdL79m5mG3yfXf00VfHssHAa"
                  token={handleToken}
                  billingAddress
                  shippingAddress
                  name="All Products"
                  amount="1"
                ></StripeCheckout>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
