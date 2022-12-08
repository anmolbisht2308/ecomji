import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import navbar_logo from "../utils/jigodji.png";
import "./Navbar.css";

import DehazeIcon from "@mui/icons-material/Dehaze";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LogoutIcon from "@mui/icons-material/Logout";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import Side from "./Side";

import { auth, db } from "../firebaseConfig/Firebase";
import {
  collection,
  getDocs,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";

const Navbar = () => {
  const Navigate = useNavigate();
  const handlehome = () => {
    Navigate("/");
  };
  const [hambergerOpen, setHambergerOpen] = useState(false);

  const toggleHamberger = () => {
    setHambergerOpen(!hambergerOpen);
  };
  const [user, setUser] = useState("");
  const userCollectionRef = collection(db, "users");

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

  const logout = () => {
    auth.signOut().then(() => {
      Navigate("/login");
    });
  };

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

  return (
    <>
      <div className="navbar" style={{ backgroundColor: "black" }}>
        <div
          className="navbar-left"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <img src={navbar_logo} onClick={handlehome} />
          <h3
            onClick={handlehome}
            style={{ color: "wheat", cursor: "pointer" }}
          >
            EcomJI
          </h3>
        </div>
        <div className="navbar-right">
          <div className="navbar-right-member">
            <Link to="/" className="navbar-right-p">
              <HomeIcon />

              <p>Home</p>
            </Link>
            <Link to="/cart" className="navbar-right-p">
              <ShoppingCartIcon />

              <p>
                Cart
                {loggedUser && <span>{loggedUser && cartdata.length}</span>}
              </p>
            </Link>

            {!loggedUser && (
              <Link to="/login" className="navbar-right-p">
                <LoginIcon />

                <p>Login</p>
              </Link>
            )}

            {!loggedUser && (
              <Link to="/register" className="navbar-right-p">
                <HowToRegIcon />

                <p>Register</p>
              </Link>
            )}
            {loggedUser && (
              <Link to="/addproduct" className="navbar-right-p">
                <LibraryAddIcon />

                <p>Add Product</p>
              </Link>
            )}

            {loggedUser && (
              <div className="navbar-right-p" style={{ cursor: "pointer" }}>
                <LogoutIcon />

                <p onClick={logout}>Logout</p>
              </div>
            )}
          </div>
          {loggedUser && (
            <div className="profile-mob">
              <Link to="/profile" className="navbar-right-p">
                <p>Welcome,</p>
                <h3>{loggedUser && loggedUser[0]?.username?.substr(0, 1)}</h3>
              </Link>
            </div>
          )}

          {hambergerOpen && (
            <div className="Side">
              <Side
                anm={hambergerOpen}
                setanm={setHambergerOpen}
                user={loggedUser[0]}
                // cartdata={cartdata}
              />
            </div>
          )}
          <div onClick={toggleHamberger} className="hamberger-menu">
            <DehazeIcon />
          </div>
        </div>
        <div className="profile">
          {loggedUser && (
            <Link to="/profile" className="navbar-right-p">
              <p>Welcome , </p>
              <h3>{loggedUser && loggedUser[0]?.username}</h3>
            </Link>
          )}
        </div>
      </div>
      <div className="down-nav">
        <a href="/product-brand/nike">
          <button>Nike</button>
        </a>
        <a href="/product-brand/puma">
          <button>Puma</button>
        </a>
        <a href="/product-brand/adidas">
          <button>Adidas</button>
        </a>
        <a href="/product-brand/lv">
          <button>LV</button>
        </a>
      </div>
    </>
  );
};

export default Navbar;
