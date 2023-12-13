import React from "react";
import "../App.css";

function Footer() {
  return (
    <div className="Main">
      <a href="/about" target="_blank" className="footer_about_link">
        About Us
      </a>
      <a href="/privacy" target="_blank" className="footer_about_link">
        Privacy Policy
      </a>
      <a href="/term" target="_blank" className="footer_about_link">
        Terms & Conditions
      </a>
    </div>
  );
}

export default Footer;
