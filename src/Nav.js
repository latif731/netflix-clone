import React, { useEffect, useState } from "react";
import Logo from "./asset/netflixlogo.png";
import "./nav.css";

const Nav = () => {
  const [show, handleShow] = useState();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);
  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img className="nav__logo" src={Logo} alt="Netflix Logo" />
      <img className="nav__avatar" src={Logo} alt="Netflix Logo" />
    </div>
  );
};

export default Nav;
