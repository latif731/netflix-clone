import React from "react";
import Layout from "../layout/Layout";
import Head from "../components/Home/Head";
import { FiMail, FiMapPin, FiPhoneCall } from "react-icons/fi";

const ContactUs = () => {
  const ContactData = [
    {
      id: 1,
      title: "Email Us",
      info: "Interactively grow backend ideas for cross-platform models.",
      icon: FiMail,
      contact: "mas@gmail.com",
    },
    {
      id: 2,
      title: "Call Us",
      info: "24/7 call to our costumer service about any information asked.",
      icon: FiPhoneCall,
      contact: "08223487376",
    },
    {
      id: 2,
      title: "Location",
      info: "Jl. Abdul Rahman No.127, Daras, Pabean, Kec. Sedati, Kabupaten Sidoarjo, Jawa Timur 61253.",
      icon: FiMapPin,
      contact: "",
    },
  ];
  return (
    <Layout>
      <div
        className="min-height-screen container mx-auto px-2 my-6"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6))`,
        }}
      >
        <Head title="Contact Us" />
        <div className="grid mg:grid-cols-2 mg:grid-cols-2 gap-6 lg:mt-20 mt-10 lg:grid-cols-3 xl:gap-8">
          {ContactData.map((item) => (
            <div
              key={item.id}
              className="border border-border flex-colo p-10 bg-dry rounded-lg text-center"
            >
              <span className="flex-colo w-20 h-20 rounded-full bg-main text-subMain text-2xl ">
                <item.icon />
              </span>
              <h5 className="text-xl font-semibold mb-2">{item.title}</h5>
              <p className="mb-0 text-sm text-text font-semibold">
                <a href={`mailto:${item.contact}`} className="text-blue-600">
                  {item.contact}
                </a>
                <br />
                {item.info}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
