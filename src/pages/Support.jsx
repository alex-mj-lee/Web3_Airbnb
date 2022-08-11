import React, { useContext } from "react";
import "./support.css";
import Headers from "../components/Headers";
import { Link } from "react-router-dom";
import { nftContext } from "../context/NftContext";
var console = require("console-browserify");

const Support = () => {
  const {
    bookedList,
    imgUrl,
    setImgUrl,
    setReviewTitle,
    setReviewStory,
    reviewSubmit,
    reviewTitle,
    reviewStory,
    updateReview,
    setUpdateReivew,
  } = useContext(nftContext);

  console.log(bookedList);
  console.log(imgUrl);

  return (
    <div className="container support_container">
      <Headers />
      <hr className="line" />
      <div className="support_title">
        <h5>Reviews</h5>
        <h2>Share your stays</h2>

        <Link to={"/experiences"} className="review_link">
          See others review
        </Link>
      </div>

      <div>
        <form onSubmit={reviewSubmit} className="input_container">
          <select
            className="input_options"
            onChange={(e) => setImgUrl(e.target.value)}
          >
            {bookedList.map((option) => (
              <option value={option.imgUrl}>
                City: {option.city} Date: {option.dates}
              </option>
            ))}
          </select>
          <input
            className="title_input"
            title="Title"
            type="text"
            placeholder="Title"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
          />
          <textarea
            className="text_input"
            placeholder="Tell your story..."
            autoFocus={true}
            value={reviewStory}
            onChange={(e) => setReviewStory(e.target.value)}
          />
          <button className="writeSubmit" type="submit">
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default Support;
