import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Foodsy — Share the Bite 🍴</p>
    </footer>
  );
};

export default Footer;
