import React from "react";
import "../Home/Home.css";
import Alison from "../Assets/logo/alison.png";
import CodeAcademy from "../Assets/logo/code_academy.png";
import CourseEra from "../Assets/logo/courseera.png";
import Cloudguru from "../Assets/logo/cloudguru.png";
import FutureLearn from "../Assets/logo/futurelearn.png";
import KhanAcademy from "../Assets/logo/khan_academy.png";
import Masterclass from "../Assets/logo/masterclass.png";
import Skillshare from "../Assets/logo/skill_share.png";
import Sololearn from "../Assets/logo/sololearn.png";
import Treehouse from "../Assets/logo/treehouse.png";
import Udacity from "../Assets/logo/udacity.png";
import Pluralsight from "../Assets/logo/pluralsight.png";
import Navbar from "../../Navbar/Navbar";
import ImageSlider from "./imageSlider";
import { SliderData } from "./sliderData";
import Marquee from "react-fast-marquee";

function Home() {
  const [value, setValue] = React.useState(2);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Navbar />

      <div className="home-main-section">
        <div className="right_course_main">
          <div className="top">
            <div className="left">
              <div className="tag find_course_heading">
                UK'S #1 COURSE REVIEWS PLATFORM
              </div>
              <div className="tag2 right_course_heading_">
                FIND THE RIGHT <br />
                COURSE FOR YOUR <br /> GROWTH.
              </div>
              <div className="numbers find_course_heading trust_heading">
                Trusted by 5Cr+ Students | 4 Lakh Institution
              </div>
            </div>
            <div className="right">
              <ImageSlider slides={SliderData} />
            </div>
          </div>
        </div>

        <div className="bottom supported_client_main">
          <p
            style={{ textAlign: "center", color: " #0bb980" }}
            className="landing_supported_heading"
          >
            Our Supported Platform
          </p>
          <div className="companies">
            <Marquee speed="50" autoFill="true">
              <div>
                <img src={Alison} alt="" className="support_client" />
              </div>
              <div>
                <img src={CodeAcademy} alt="" className="support_client" />
              </div>
              <div>
                <img src={CourseEra} alt="" className="support_client" />
              </div>
              <div>
                <img src={Cloudguru} alt="" className="support_client" />
              </div>
              <div>
                <img src={FutureLearn} alt="" className="support_client" />
              </div>
              <div>
                <img src={KhanAcademy} alt="" className="support_client" />
              </div>
              <div>
                <img src={Masterclass} alt="" className="support_client" />
              </div>
              <div>
                <img src={Skillshare} alt="" className="support_client" />
              </div>
              <div>
                <img src={Sololearn} alt="" className="support_client" />
              </div>
              <div>
                <img src={Treehouse} alt="" className="support_client" />
              </div>
              <div>
                <img src={Udacity} alt="" className="support_client" />
              </div>
              <div>
                <img src={Pluralsight} alt="" className="support_client" />
              </div>
            </Marquee>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
