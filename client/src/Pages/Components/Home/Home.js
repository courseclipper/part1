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

import Navbar from "../../Navbar";
import ImageSlider from "./imageSlider";
import { SliderData } from "./sliderData";

function Home() {
  const [value, setValue] = React.useState(2);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Navbar />

      <div className="home-main-section">
        <div className="top">
          <div className="left">
            <div className="tag">UK'S #1 COURSE REVIEWS PLATFORM</div>
            <div className="tag2">
              FIND THE RIGHT <br />
              COURSE FOR YOUR <br /> GROWTH.
            </div>
            <div className="numbers">
              Trusted by 5Cr+ Students | 4 Lakh Institution
            </div>
          </div>
          <div className="right">
            <ImageSlider slides={SliderData} />
          </div>
        </div>

        <div className="bottom">
          <h4 style={{ textAlign: "center", color: " #0bb980" }}>
            Our Supported Platform
          </h4>
          <div className="companies">
            <div>
              <img
                src={Alison}
                alt=""
              />
            </div>
            <div>
              <img
                src={CodeAcademy}
                alt=""
              />
            </div>
            <div>
              <img
                src={CourseEra}
                alt=""
              />
            </div>
            <div>
              <img
                src={Cloudguru}
                alt=""
              />
            </div>
            <div>
              <img
                src={FutureLearn}
                alt=""
              />
            </div>
            <div>
              <img
                src={KhanAcademy}
                alt=""
              />
            </div>
          </div>
          <div className="companies">
            <div>
              <img
                src={Masterclass}
                alt=""
              />
            </div>
            <div>
              <img
                src={Skillshare}
                alt=""
              />
            </div>
            <div>
              <img
                src={Sololearn}
                alt=""
              />
            </div>
            <div>
              <img
                src={Treehouse}
                alt=""
              />
            </div>
            <div>
              <img
                src={Udacity}
                alt=""
              />
            </div>
            <div>
              <img
                src={Pluralsight}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
