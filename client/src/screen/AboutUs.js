import React from "react";
import Head from "../components/Home/Head";
import Layout from "../layout/Layout";

const AboutUs = () => {
  return (
    <Layout>
      <div
        className="min-height-screen container mx-auto px-2 my-6"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6))`,
        }}
      >
        <Head title="About Us" />
        <div className="xl:py-20 py-10 px-4">
          <div className="grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center">
            <div>
              <h3 className="text-ul lg:text-3xl mb-4 font font-semibold">
                Welcome to netflix clone
              </h3>
              <div className="mt-3 text-sm leading-8 text-text">
                <p>
                  Ea nostrud ullamco consequat veniam do quis. Ad quis
                  incididunt proident laborum id non amet enim anim do mollit
                  consectetur. Ullamco ad veniam consectetur est velit
                  incididunt duis ut. Reprehenderit et id minim cupidatat
                  cupidatat cillum aliqua elit anim et aliquip do. Dolor sit
                  voluptate sit dolore ea ullamco et
                </p>
                <p>
                  Ea nostrud ullamco consequat veniam do quis. Ad quis
                  incididunt proident laborum id non amet enim anim do mollit
                  consectetur. Ullamco ad veniam consectetur est velit
                  incididunt duis ut. Reprehenderit et id minim cupidatat
                  cupidatat cillum aliqua elit anim et aliquip do. Dolor sit
                  voluptate sit dolore ea ullamco et
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="p-8 bg-dry rounded-lg">
                  <span className="text-3xl block font-extrabold mt-4">
                    10K
                  </span>
                  <h4 className="text-lg font-bold mb-1">Listed Movies</h4>
                  <p className="mb-0 text-text leading-7 text-sm">
                    Labore cupidatat proident do id anim qui id anim adipisicing
                    incididunt.
                  </p>
                </div>
                <div className="p-8 bg-dry rounded-lg">
                  <span className="text-3xl block font-extrabold mt-4">8K</span>
                  <h4 className="text-lg font-bold mb-1">Listed Movies</h4>
                  <p className="mb-0 text-text leading-7 text-sm">
                    Completely, free without registration! Culpa et duis tempor
                    eiusmod duis cupidatat nisi.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <img
                src="https://bacaterus.com/wp-content/uploads/2020/09/Batman-v-Superman-Movie-Poster_.webp"
                className="w-full xl:block hidden h-header rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
