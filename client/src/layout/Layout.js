import React from "react";
import NavBar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import MobileFooter from "./footer/MobileFooter";

const Layout = ({ children }) => {
  return (
    <>
      <div className="bg-main text-white">
        <NavBar />
        {children}
        <Footer />
        {/* mobile footer */}
        <MobileFooter />
      </div>
    </>
  );
};

export default Layout;
