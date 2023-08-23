import React from "react";
import nf from  "../images/notfound.png"
import Layout from "../layout/Layout";
import {Link} from "react-router-dom"
import { BiHome } from "react-icons/bi";

const NotFound = () => {
  return <div className="flex-colo w-full min-h-screen text-white bg-main lg:py-20 py-10 px-6">
    <img className="w-full h-96 object-contain" src={nf} alt="notfound"/>
    <p className="font-medium text-border italic leading-6">
      The page you are looking for does not exist. You may have mistyped the URL 
    </p>
    <Link to="/" className="bg-subMain text-white flex-rows gap-5 font-medium py-3 px-4 rounded-md mt-5 w-40">
    Go Back<BiHome/>
    </Link>
  </div>
};

export default NotFound;
