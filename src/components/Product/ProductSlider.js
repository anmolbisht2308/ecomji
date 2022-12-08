import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import ProductContainer from "./ProductContainer";
import {
  collection,
  query,
  onSnapshot,
  getDocs,
  doc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig/Firebase";
import SliderProductCard from "./SliderProductCard";

const ProductSlider = (props) => {
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

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div>
      <Carousel responsive={responsive}>
        {products.map((prod) => (
          <SliderProductCard product={prod} key={prod.id} />
        ))}
      </Carousel>
    </div>
  );
};

export default ProductSlider;
