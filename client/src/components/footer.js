import React from "react";
import logo from "../logo.png";
import Avatar from "../logo.png";

const Footer = () => {
  return (
    <nav className="bg-gray-900">
      <div className="container mx-auto px-4 py-6 flex justify-center items-center">
        {/* Logo */}
        <a className="mr-auto" href="/">
          <img
            src={logo}
            width="110"
            height="40"
            className="inline-block align-top"
            alt="bank"
          />
        </a>
        {/* Navigation Links */}
        <ul className="flex-1 flex justify-center items-center">
          <li className="mr-6">
            <a
              className="text-gray-400 hover:text-white transition duration-150 ease-in-out"
              href="/"
            >
              Home
            </a>
          </li>
          <li className="mr-6">
            <a
              className="text-gray-400 hover:text-white transition duration-150 ease-in-out"
              href="/about"
            >
              About
            </a>
          </li>
          <li>
            <a
              className="text-gray-400 hover:text-white transition duration-150 ease-in-out"
              href="/user"
            >
              User
            </a>
          </li>
        </ul>
        {/* Copyright */}
        <div className="text-white text-center ml-auto">
          © 2023 Grandida Inc. All rights reserved. | Created by Team Enovate
        </div>
        {/* Samuel's Avatar */}
        <img
          src={Avatar}
          width="30"
          height="30"
          className="inline-block rounded-full ml-4"
          alt="Samuel's avatar"
        />
      </div>
    </nav>
  );
};

export default Footer;
