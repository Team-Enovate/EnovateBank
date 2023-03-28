import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="flex flex-col items-center justify-center px-16 py-32 bg-white">
      <h1 className="text-7xl font-extrabold tracking-tight text-center text-red-800 uppercase">
        Enovate
      </h1>
      <p className="mt-8 mb-12 text-xl font-medium text-center text-gray-800">
        Welcome to our smart contract! Safety, all the data are cryptographically protected. No fraudulent data. With our smart contract, you can have peace of mind knowing that all parties will abide by the agreed-upon terms.
      </p>
      <div className="flex justify-center">
        <Link
          to="/user"
          className="px-10 py-4 text-xl font-medium text-white uppercase bg-green-800 rounded-full hover:bg-green-700 transition-all duration-300"
        >
         Go to Banking Section
        </Link>
      </div>
    </div>
  );
};

export default Banner;
