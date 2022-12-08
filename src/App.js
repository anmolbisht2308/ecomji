import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import AllProductPage from "./components/Product/AllProductPage";
import ProductContainer from "./components/Product/ProductContainer";
import SingleProduct from "./components/Product/SingleProduct";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route
          path="/product-brand/nike"
          element={<AllProductPage type={"Nike"} />}
        />
        <Route
          path="/product-brand/adidas"
          element={<AllProductPage type={"Adidas"} />}
        />
        <Route
          path="/product-brand/puma"
          element={<AllProductPage type={"Puma"} />}
        />
        <Route
          path="/product-brand/lv"
          element={<AllProductPage type={"LV"} />}
        />
        {/* <Route path="/all" element={<AllProductPage />} /> */}
        <Route path="/product/:id/:brand" element={<SingleProduct />} />

        <Route path="/*" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
