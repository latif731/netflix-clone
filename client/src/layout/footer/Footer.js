import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/logo2.jpeg";

const Footer = () => {
  const Links = [
    {
      title: "Top Categories",
      links: [
        {
          name: "Action",
          link: "#",
        },
        {
          name: "Romantic",
          link: "#",
        },
        {
          name: "Drama",
          link: "#",
        },
        {
          name: "Historical",
          link: "#",
        },
      ],
    },
    {
      title: "Company",
      links: [
        {
          name: "Home",
          link: "/",
        },
        {
          name: "About us",
          link: "/about-us",
        },
        {
          name: "Contact us",
          link: "/contact-us",
        },
        {
          name: "Movies",
          link: "/movies",
        },
      ],
    },
    {
      title: "My Account",
      links: [
        {
          name: "Dashboard",
          link: "/dashboard",
        },
        {
          name: "My Favorites",
          link: "/favorites",
        },
        {
          name: "Profile",
          link: "/profile",
        },
        {
          name: "Change Password",
          link: "/password",
        },
      ],
    },
  ];
  return (
    <div className="bg-dry py-4 border=t-2 border-lack">
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 py-10 justify-between">
          {Links.map((link, index) => (
            <div
              key={index}
              className="col-span-1 md:col-span-2 lg:col-span-3 pb-3.5 sm:pb-0"
            >
              <h3 className="text-md lg:leading-7 font-medium  sm:mb-5 lg:mb-6 mb-3.5 ">
                {link.title}
              </h3>
              <ul className="text-sm flex flex-col space-y-3">
                {link.links.map((text, index) => (
                  <li key={index} className="flex item-baseline">
                    <Link
                      to={text.link}
                      className="text-border inline-block w-full hover:text-subMain"
                    >
                      {text.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
            <Link to="/">
              <img
                src={Logo}
                className="w-2/4 object-contain h-32"
                // style={{ width: "900px" }}
              />
            </Link>
            <p className="leading-7 text-sm text-border mt-3">
              <span>Amet mollit qui amet nostrud eu aliquip</span>
              <br />
              <span>Tell: +6285782244135</span>
              <br />
              <span>Email: pamungkkaslatifbudi@gmail.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
