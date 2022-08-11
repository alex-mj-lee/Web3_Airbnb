import React, { useContext } from "react";
import "./experiences.css";
import Headers from "../components/Headers";
import audi from "../images/audi.jpg";
import { Link } from "react-router-dom";
import { MdOutlineReviews } from "react-icons/md";
import { nftContext } from "../context/NftContext";

import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
var console = require("console-browserify");

const Experiences = () => {
  const { reviewList } = useContext(nftContext);
  console.log(reviewList);
  return (
    <div className="container review_container">
      <Headers />
      <hr className="line" />
      <div className="review_list_title">
        <h5>Reviews</h5>
        <h2>Airbnb True Review</h2>

        <Link to={"/support"} className="review_link">
          Leave your opinion <MdOutlineReviews />
        </Link>
      </div>

      <Swiper
        modules={[Pagination]}
        spaceBetween={40}
        slidesPerView={3}
        pagination={{ clickable: true }}
        className="cards_container"
        breakpoints={{
          200: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          650: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          923: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
      >
        {reviewList &&
          reviewList.map((review) => {
            return (
              <SwiperSlide>
                <div className="card">
                  <div>
                    <img src={review.imgUrl} alt="NFT image" />
                  </div>
                  <h2>Title: {review.title}</h2>
                  <p>Reviews: {review.story}</p>
                  <div className="button_container">
                    <button className="bad_button">Bad</button>
                    <button className="good_button">Good</button>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default Experiences;
