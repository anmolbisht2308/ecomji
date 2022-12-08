import React from "react";
import { Link } from "react-router-dom";
import "./productcontainer.css";

const ProductContainer = ({ product }) => {
  let mrp = parseInt(product.price);
  const discount_price = parseInt(mrp - (10 / 100) * mrp);
  const save = parseInt(mrp - discount_price);

  // imp console log

  console.log(product);
  return (
    <Link to={`/product/${product.id}/${product.brand}`}>
      <div className="productcard">
        <div classNameproductcard="prodcardheader">{product.productTitle}</div>
        <div className="prod_img">
          <img src={product.productImage} alt="" />
        </div>
        <div style={{ marginBottom: "-1rem" }} className="prod_price">
          MRP:₹<span className="oprice">{product.price}</span>
        </div>

        <div className="prod_price">
          Discount MRP:₹<span className="dprice">{discount_price}</span>
        </div>
        <div className="prod_price">
          You Save MRP:₹<span className="sprice">{save}</span>
        </div>
        {/* <div className="buttons">
          <div className="btn">Buy Now</div>
          <div className="btn">Add To Cart</div>
        </div> */}
      </div>
    </Link>
  );
};

export default ProductContainer;
