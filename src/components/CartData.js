import React, { useState } from "react";
import "./CartData.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { auth, db } from "../firebaseConfig/Firebase";
import {
  collection,
  getDocs,
  query,
  QuerySnapshot,
  where,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const CartData = ({ item, userId }) => {
  const [qty, setQty] = useState(item.quantity);
  let mrp = parseInt(item.product.price);
  const discount_price = parseInt(mrp - (10 / 100) * mrp);
  const save = parseInt(mrp - discount_price);

  //   console.log(item);

  const deletecartitmes = async () => {
    await deleteDoc(doc(db, `cart-${userId}`, `${item.id}`)).then(() => {
      // document deleted
    });
  };

  const incr = async () => {
    setQty(qty + 1);
    const itemRef = doc(db, `cart-${userId}`, `${item.id}`);
    await updateDoc(itemRef, {
      quantity: qty + 1,
    }).then(() => {
      // updated qauntity on database
    });
  };
  const decr = async () => {
    if (qty > 0) setQty(qty - 1);
    const itemRef = doc(db, `cart-${userId}`, `${item.id}`);
    await updateDoc(itemRef, {
      quantity: qty - 1,
    }).then(() => {
      // updated qauntity on database
    });
  };
  if (qty == 0) deletecartitmes();
  return (
    <>
      {/* {{ qty } == 0 && <>No Products </>} */}

      <div className="card_data_item">
        <div className="card_data_item_img">
          <img src={item.product.productImage} />
        </div>
        <div className="card_data_item_buttons">
          <div className="inc" onClick={incr}>
            +
          </div>
          <div className="dec" onClick={decr}>
            -
          </div>
        </div>
        <div className="rowss">
          <div className="card_data_item_qty">
            <h4>QTY:{qty}</h4>
          </div>
          <div className="card_data_item_price">
            <h4> MRP:₹{discount_price * qty}</h4>
          </div>
        </div>
        <div className="cart_data_item_delete">
          <DeleteIcon onClick={deletecartitmes} className="dlt" />
        </div>
      </div>
    </>
  );
};

export default CartData;
