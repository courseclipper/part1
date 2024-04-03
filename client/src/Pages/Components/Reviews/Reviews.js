import React, { useEffect, useState, useCallback } from "react";
import "../Reviews/Reviews.css";
import Rating from "@mui/material/Rating";
import Navbar from "../../Navbar/Navbar";
import api from "../../../api";
import { Box, Modal, Stack, TextField, Tooltip, Typography } from "@mui/material";

const Reviews = () => {
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [enterCourseTitle, setEnterCourseTitle] = useState('');
  const [review, setReview] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReviews, setSelectedReviews] = useState([]);
  const [uniqueReviews, setUniqueReviews] = useState([]);

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

  useEffect(() => {
    const uniqueCourses = {};

    filteredReviews.forEach(review => {
      if (!uniqueCourses[review.courseName]) {
        uniqueCourses[review.courseName] = {
          review: review,
          count: 1
        };
      } else {
        uniqueCourses[review.courseName].count++;
      }
    });

    const uniqueReviewsArray = Object.values(uniqueCourses).map(course => {
      return {
        review: course.review,
        count: course.count
      };
    });

    setUniqueReviews(uniqueReviewsArray)
  }, [filteredReviews])

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
    setSelectedReviews(filteredReviews.filter(rev => rev.courseName === review.courseName))
    setModalOpen(true)

    if (review.AffiliatedLink) {
      window.location.href = review.AffiliatedLink
    }
  }

  const moreReviewsMessage = (reviewsCount) => {
    const count = reviewsCount - 1

    if (count > 0) {
      return count === 1 ? '1 more review' : `${count} more reviews`
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
          {uniqueReviews.map((item, id) => {
            return (
              <div
                className="rev-content"
                onClick={() => handleClickReview(item.review)}
                key={id}
              >
                <div className="rev-icon-star">
                  <img
                    src={`https://logo.clearbit.com/${item.review.Logo}`}
                    alt=""
                    style={{ width: "65px", height: "65px" }}
                  />
                  <Rating
                    name="read-only"
                    size="large"
                    value={item.review.Rating}
                    readOnly
                    style={{
                      color: "green",
                      position: "relative",
                      bottom: "0.7rem",
                    }}
                  />
                </div>
                <div className="rev-cust-cont1">
                  <span>{item.review.username}</span>
                  <span>reviewed</span>
                  <span>{item.review.platformName}</span>
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
                  <Tooltip arrow title={<Typography sx={{ fontSize: '14px' }}>{item.review.courseName}</Typography>}>
                    <p>Title: <strong>{item.review.courseName || 'N/A'}</strong></p>
                  </Tooltip>
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
                  <Tooltip arrow title={<Typography sx={{ fontSize: '14px' }}>{item.review.courseDescription}</Typography>}>
                    <p sx={{ mb: 2 }}>Description: <strong>{item.review.courseDescription}</strong></p>
                  </Tooltip>
                </div>
                <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography className="rev-content1">{moreReviewsMessage(item.count)}</Typography>
                  <Typography className="rev-content1">{calculateTimeDifference(item.review.TimeofUpload)}</Typography>
                </Stack>
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
            alignItems: 'center',
          }}
        >
          <Box sx={{
            backgroundColor: 'white',
            borderRadius: '5px',
            padding: '32px',
            width: '400px',
            maxHeight: '600px',
            overflow: 'scroll'
          }}>
            {selectedReviews?.map((selectedReview) => {
              return (
                <div
                  className="rev-content"
                  style={{ margin: 'auto', marginTop: '10px' }}
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
                    <Tooltip arrow title={<Typography sx={{ fontSize: '14px' }}>{selectedReview?.courseName}</Typography>}>
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
                    <Tooltip arrow title={<Typography sx={{ fontSize: '14px' }}>{selectedReview?.courseDescription}</Typography>}>
                      <p>Description: <strong>{selectedReview?.courseDescription}</strong></p>
                    </Tooltip>
                    <div className="rev-time">
                      {calculateTimeDifference(selectedReview?.TimeofUpload)}
                    </div>
                  </div>
                </div>
              )
            })}
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Reviews;
