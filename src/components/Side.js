import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
import ClearIcon from "@mui/icons-material/Clear";

const Side = (props) => {
  const Navigate = useNavigate();
  const Location = useLocation();
  const [hambergerOpen, setHambergerOpen] = useState(true);
  const toggleHamberger = () => {
    setHambergerOpen(!hambergerOpen);
    props?.setanm(!props?.anm);
  };
  return (
    <>
      {hambergerOpen && (
        <div
          style={{ display: "flex", flexDirection: "column" }}
          className="kide"
        >
          <div
            className="side-top"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div></div>

            <ClearIcon
              style={{ position: "absolute", right: "24px", top: "24px" }}
              onClick={toggleHamberger}
            />
          </div>
          <div
            className="side-icon"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItem: "center",
              textAlign: "center",
              gap: "3rem",
            }}
          >
            <div onClick={() => Navigate("/")}>Home</div>
            <div onClick={() => Navigate("/cart")}>
              Cart<span>{props?.cartdata?.length}</span>
            </div>
            <div onClick={() => Navigate("/login")}>Login</div>
            {/* {!props.user && ( */}
            <div onClick={() => Navigate("/register")}>Register</div>
            {/* )} */}

            <div onClick={() => Navigate("/logout")}>Log Out</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Side;
