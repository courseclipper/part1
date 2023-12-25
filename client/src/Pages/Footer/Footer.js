import React from "react";
import "./Footer.css";
import { IoIosArrowForward } from "react-icons/io";

function Footer() {
  return (
    <footer className="responsive-footer">
      <div className="footer-top">
        {/* <div className="footer-left"> */}
        <p className="footer_heading">
          Review Hub: Where Opinions Matter, <br />
          and Insights Shine.
        </p>
        {/* </div> */}
        <div className="footer-right">
          <a href="/review" className="add_review_btn_main">
            <div
              className="get_started_btn"
              // onClick={() => {
              //   navigate("/signup");
              // }}
            >
              Review{" "}
              <IoIosArrowForward
                style={{ marginRight: "0.3rem", marginTop: "0.2rem" }}
              />
            </div>
          </a>
        </div>
      </div>
      <hr style={{ borderTop: "1px solid white" }} />
      <div className="footer_link_main">
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
    </footer>
  );
}

export default Footer;
