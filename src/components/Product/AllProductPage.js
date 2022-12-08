import React, { useEffect, useState } from "react";
import "./AllProductPage.css";
import ProductContainer from "./ProductContainer";
import { collection, query, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig/Firebase";

const AllProductPage = (props) => {
  // console.log(props.type);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = () => {
      const productsArray = [];
      // getting the path from f
      const path = `products-${props.type.toUpperCase()}`;
      // console.log(path);
      getDocs(collection(db, path))
        .then((querySnapshot) => {
          // console.log(querySnapshot);
          //all data has come to querysnapshot
          querySnapshot.forEach((doc) => {
            productsArray.push({ ...doc.data(), id: doc.id });
          });
          setProducts(productsArray);
          // console.log(products);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    getProducts();
    // console.log(products);
  }, []);

  return (
    <div className="allproductpagescontainer">
      <div style={{ textAlign: "center" }} className="allproductpagesheader">
        Top Result For: <b>{props.type}</b>
      </div>
      <div className="productconatiner">
        {products.map((prod) => {
          return (
            <div className="prodcontcard">
              <ProductContainer product={prod} key={prod.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProductPage;
