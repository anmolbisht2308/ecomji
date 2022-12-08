import React from "react";
import { Link } from "react-router-dom";
import "./productcontainer.css";
import "./sliderproductcard.css";

const SliderProductCard = ({ product }) => {
  // console.log(product.productTitle);

  let mrp = parseInt(product.price);
  const discount_price = parseInt(mrp - (10 / 100) * mrp);
  const save = parseInt(mrp - discount_price);
  return (
    <div className="sliderproductcard">
      {/* {product.productTitle} */}

      <div className="prodcardheader">{product.productTitle}</div>
      <div className="prod_img">
        <img src={product.productImage} alt="" />
      </div>
      <div className="price">
        <div className="prod_price">
          MRP:₹<span className="oprice">{product.price}</span>
        </div>

        <div className="prod_price">
          Discount MRP:₹<span className="dprice">{discount_price}</span>
        </div>
        <div className="prod_price">
          You Save MRP:₹<span className="sprice">{save}</span>
        </div>
      </div>

      <Link to={`/product/${product.id}/${product.brand}`}>
        <div className="show_more">Show More</div>
      </Link>
    </div>
  );
};

export default SliderProductCard;
