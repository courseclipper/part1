import React, { useEffect, useState, useCallback } from "react";
import "../Reviews/Reviews.css";
import Rating from "@mui/material/Rating";
import Navbar from "../../Navbar/Navbar";
import api from "../../../api";
import { Box, Modal, Stack, TextField, Tooltip } from "@mui/material";

const Reviews = () => {
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [enterCourseTitle, setEnterCourseTitle] = useState('');
  const [review, setReview] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState();

  const fetchReviews = useCallback(async () => {
    try {
      const response = await api.get("/reviews");
      const data = response.data;
      data.reverse();
      setReview(data);
      setFilteredReviews(data);
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

  const onTextChange = (event) => {
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

  const handleClickReview = (review) => {
    setSelectedReview(review)
    setModalOpen(true)

    if (review.AffiliatedLink) {
      window.location.href = review.AffiliatedLink
    }
  }

  return (
    <>
      <Navbar />
      <div className="rev-main-cont">
        <div className="rev-topbar">
          <Stack className="navbar-stack">
            <TextField
              className="navbar-field"
              d="outlined-basic"
              label="Search by Course Title"
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
                onClick={() => handleClickReview(item)}
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
                  <Tooltip title={item.courseName}>
                    <p>Title: <strong>{item.courseName || 'N/A'}</strong></p>
                  </Tooltip>
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
                  <Tooltip title={item.courseDescription}>
                    <p>Description: <strong>{item.courseDescription}</strong></p>
                  </Tooltip>
                  <div className="rev-time">
                    {calculateTimeDifference(item.TimeofUpload)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box sx={{
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '32px',
            padding: '32px'
          }}>
            <div
              className="rev-content"
              style={{ maxWidth: '98vw', width: 'fit-content' }}
            >
              <div className="rev-icon-star">
                <img
                  src={`https://logo.clearbit.com/${selectedReview?.Logo}`}
                  alt=""
                  style={{ width: "65px", height: "65px" }}
                />
                <Rating
                  name="read-only"
                  size="large"
                  value={selectedReview?.Rating}
                  readOnly
                  style={{
                    color: "green",
                    position: "relative",
                    bottom: "0.7rem",
                  }}
                />
              </div>
              <div className="rev-cust-cont1">
                <span>{selectedReview?.username}</span>
                <span>reviewed</span>
                <span>{selectedReview?.platformName}</span>
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
                <Tooltip title={selectedReview?.courseName}>
                  <p>Title: <strong>{selectedReview?.courseName || 'N/A'}</strong></p>
                </Tooltip>
                <div className="rev-time">
                  {calculateTimeDifference(selectedReview?.TimeofUpload)}
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
                <Tooltip title={selectedReview?.courseDescription}>
                  <p>Description: <strong>{selectedReview?.courseDescription}</strong></p>
                </Tooltip>
                <div className="rev-time">
                  {calculateTimeDifference(selectedReview?.TimeofUpload)}
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Reviews;
