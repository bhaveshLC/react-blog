import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Blog Application. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors dark:text-gray-500 dark:hover:text-gray-300"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors dark:text-gray-500 dark:hover:text-gray-300"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors dark:text-gray-500 dark:hover:text-gray-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
