import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
// import {Carousel} from "react-responsive-carousel";
import "./Home.css";
import Typewriter from "typewriter-effect";
import { auth, db } from "../firebaseConfig/Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import "animate.css";
import ProductSlider from "./Product/ProductSlider";

const Home = () => {
  var images = [
    {
      src: "https://i2.wp.com/skateboarding.transworld.net/wp-content/uploads/2020/08/nike-sb-dunk-low-chicago-bq6817-600-lateral.jpeg",
    },
    {
      src: "https://www.popplebird.co.uk/wp-content/uploads/Jordan/Kids/553560-118.jpg",
    },
  ];

  // function GetCurrentUser() {
  //   const [user, setUser] = useState("");
  //   const userCollectionRef = collection(db, "users");

  //   useEffect(() => {
  //     auth.onAuthStateChanged((userlogged) => {
  //       if (userlogged) {
  //         const getUsers = async () => {
  //           const q = query(
  //             collection(db, "users"),
  //             where("uid", "==", userlogged.uid)
  //           );
  //           // console.log(q);
  //           const data = await getDocs(q);
  //           setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //           // console.log(data.docs);
  //         };
  //         getUsers();
  //       } else {
  //         setUser(null);
  //       }
  //     });
  //   }, []);
  //   return user;
  // }

  // const loggedUser = GetCurrentUser();
  // if (loggedUser) {
  //   console.log(loggedUser[0]);
  // }

  return (
    <div className="home">
      <div className="home-header">
        <Typewriter
          onInit={(typewriter) => {
            typewriter

              .typeString("EcomJI ")

              // .pauseFor(1000)
              // .deleteAll()
              .typeString("Welcomes You")
              .start();
          }}
        />
      </div>
      <div className="homecarousel">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={1}
          infiniteLoop={true}
          showStatus={false}
          className="carousel animate__animated animate__backInDown"
        >
          {/* <div className="item"> */}
          {images.map((image, i) => (
            <div className="item">
              <img key={i} src={image.src} width="100%" height="100%" />
            </div>
          ))}
          {/* </div> */}
        </Carousel>
        <div className="sale">
          <h3 className="animate__animated animate__shakeX">20% OFF!!</h3>
        </div>
      </div>
      <div className="content">
        <ProductSlider type={"Adidas"} />
        <ProductSlider type={"Nike"} />
        <ProductSlider type={"Puma"} />
        <ProductSlider type={"LV"} />
      </div>
    </div>
  );
};

export default Home;
