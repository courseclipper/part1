import React, { useEffect, useState, useCallback } from "react";
import "../Reviews/Reviews.css";
import { useNavigate } from "react-router";
import Rating from "@mui/material/Rating";
import Navbar from "../../Navbar/Navbar";
import api from "../../../api";
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";

const Reviews = () => {
  const navigate = useNavigate();
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [selectCourseTitle, setSelectCourseTitle] = useState('');
  const [enterCourseTitle, setEnterCourseTitle] = useState('');
  const [uniqueCourseNames, setUniqueCourseNames] = useState([]);
  const [review, setReview] = useState([]);
  const fetchReviews = useCallback(async () => {
    try {
      const response = await api.get("/reviews");
      const data = response.data;
      data.reverse();
      setReview(data);
      setFilteredReviews(data);
      const courseNames = [...new Set(
        data.filter(review => review.courseName)
          .map(review => review.courseName)
      )];
      setUniqueCourseNames(courseNames);
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

  const onSelectChange = (event) => {
    setEnterCourseTitle('');
    setSelectCourseTitle(event.target.value);
    const selectedReviews = review.filter(rev => rev.courseName === event.target.value);
    setFilteredReviews(selectedReviews);
  }

  const onTextChange = (event) => {
    setSelectCourseTitle('');
    setEnterCourseTitle(event.target.value);

    if (event.target.value === '') {
      setFilteredReviews(review);
      return;
    }

    setTimeout(() => {
      const selectedReviews = review.filter(rev => rev.courseName?.toLowerCase()?.includes(event.target.value?.toLowerCase()));
      setFilteredReviews(selectedReviews);
    }, 500);
  }

  return (
    <>
      <Navbar />
      <div className="rev-main-cont">
        <div className="rev-topbar">
          <Stack className="navbar-stack">
            <FormControl className="navbar-field">
              <InputLabel id="demo-simple-select-label">Select Course Title</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectCourseTitle}
                label="Select Course Title"
                onChange={onSelectChange}
              >
                {uniqueCourseNames.map(courseName => <MenuItem value={courseName}>{courseName}</MenuItem>)}
              </Select>
            </FormControl>
            <TextField
              className="navbar-field"
              d="outlined-basic"
              label="Enter Course Title"
              value={enterCourseTitle}
              onChange={onTextChange}
            />
          </Stack>
        </div>
        <div className="rev-mainsection">
          {filteredReviews.map((item, id) => {
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
                  <p><strong>Title:</strong> {item.courseName || 'N/A'}</p>
                  <div className="rev-time">
                    {calculateTimeDifference(item.TimeofUpload)}
                  </div>
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
                  <p><strong>Description:</strong> {item.courseDescription}</p>
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
