import React from "react";
import { FiUser } from "react-icons/fi";
import mobile from "../../images/promo.png";

const Promos = () => {
  return (
    <div className="my-20 py-10 md:px-20 px-8 bg-dry">
      <div className="lg:grid lg:grid-cols-2 lg:gap-10 items-center">
        <div className="flex lg:gap-10 gap-6 flex-col ">
          <h1 className="xl:text-3xl text-xl capitalize font-sans font-medium  leading-loose">
            Download Your Movies & Watch Offline <br />
            Enjoy On Your Mobile
          </h1>
          <p className="text-tex text-sm xl:text-base leading-6 xl:leading-8">
            Consequat id pariatur non laboris in. Nostrud do fugiat exercitation
            occaecat. Adipisicing deserunt esse eu nisi proident consectetur
            enim ad sint. Laboris et consequat adipisicing et enim sint labore
            Lorem exercitation esse anim sunt. Sit ut exercitation et duis
            irure.
          </p>
          <div className="flex gap-4 md:text-lg text-sm">
            <div className="flex-colo bg-black text-subMain px-6 py-3 rounded-md font-bold">
              HD 4K
            </div>
            <div className="flex-rows gap-4 bg-black text-subMain px-6 py-3 rounded-md">
              <FiUser /> 2K
            </div>
          </div>
        </div>
        <div>
          <img
            src={mobile}
            alt="Mobile app"
            className="w-full object-contain rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Promos;
