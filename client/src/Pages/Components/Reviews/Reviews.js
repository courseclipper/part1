import React, { useEffect, useState, useCallback } from "react";
import "../Reviews/Reviews.css";
import { useNavigate } from "react-router";
import Rating from "@mui/material/Rating";
import Navbar from "../../Navbar/Navbar";
import Axios from "axios";
import api from "../../../api";

const Reviews = () => {
  const navigate = useNavigate();
  const [review, setReview] = useState([]);
  const fetchReviews = useCallback(async () => {
    try {
      const response = await api.get("/reviews");
      setReview(response.data);
      debugger;
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    fetchReviews();
  }, []);
  const calculateTimeDifference = (timestamp) => {
    const currentTime = new Date();
    const uploadTime = new Date(timestamp);
    const timeDifference = currentTime - uploadTime;
    const minutesAgo = Math.floor(timeDifference / (1000 * 60));
    if (minutesAgo < 1) {
      return "Just now";
    } else if (minutesAgo === 1) {
      return "1 minute ago";
    } else if (minutesAgo < 60) {
      return `${minutesAgo} minutes ago`;
    } else {
      const hoursAgo = Math.floor(minutesAgo / 60);
      if (hoursAgo === 1) {
        return "1 hour ago";
      } else if (hoursAgo < 24) {
        return `${hoursAgo} hours ago`;
      } else {
        const daysAgo = Math.floor(hoursAgo / 24);
        if (daysAgo === 1) {
          return "1 day ago";
        } else {
          return `${daysAgo} days ago`;
        }
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="rev-main-cont">
        <div className="rev-topbar">In Reviews We Trust</div>
        <div className="rev-mainsection">
          {review.map((item, id) => {
            console.log(item?.platm[0]?.url);
            return (
              <div
                className="rev-content"
                onClick={() =>
                  (window.location.href = item.AffiliatedLink
                    ? item.AffiliatedLink
                    : "#")
                }
                key={id}
              >
                <div className="rev-icon-star">
                  <img
                    src={`https://logo.clearbit.com/${item?.Logo}`}
                    alt=""
                    style={{ width: "65px", height: "65px" }}
                  />
                  <Rating
                    name="read-only"
                    size="large"
                    value={item.Rating}
                    readOnly
                    style={{
                      color: "green",
                      position: "relative",
                      bottom: "0.7rem",
                    }}
                  />
                </div>
                <div className="rev-cust-cont1">
                  <span>{item.username}</span>
                  <span>reviewed</span>
                  <span>{item.platformName}</span>
                </div>
                <div
                  className="rev-content1"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                >
                  <p>{item.courseDescription}</p>
                  <div className="rev-time">
                    {calculateTimeDifference(item.TimeofUpload)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Reviews;
