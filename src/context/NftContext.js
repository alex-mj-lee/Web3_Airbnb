import React, { createContext, useState, useEffect } from "react";
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import { useNotification } from "web3uikit";

var console = require("console-browserify");

export const nftContext = createContext();

export const NftProvider = ({ children }) => {
  const { user, Moralis, isAuthenticated } = useMoralis();
  const [bookedList, setBookedList] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewStory, setReviewStory] = useState("");
  const [reviewList, setReviewList] = useState([]);
  const [updateReview, setUpdateReivew] = useState(true);
  const dispatch = useNotification();

  const userAddress = user?.get("ethAddress");

  const handleSuccess = (msg) => {
    dispatch({
      type: "success",
      message: `${msg}`,
      title: "Request Succesful",
      position: "topL",
    });
  };
  const handleError = (msg) => {
    dispatch({
      type: "error",
      message: `${msg}`,
      title: "Processing Failed",
      position: "topL",
    });
  };

  useEffect(() => {
    const fetchBookingLists = async () => {
      const nftToken = Moralis.Object.extend("newBookings");
      const query = new Moralis.Query(nftToken);
      query.equalTo("booker", userAddress);
      const result = await query.find();

      let bookedList = [];
      result.forEach((e) => {
        bookedList.push({
          city: e.attributes.city,
          transHash: e.attributes.transaction_hash,
          dates: e.attributes.datesBooked,
          imgUrl: e.attributes.imgUrl,
        });
      });
      setBookedList(bookedList);
    };
    fetchBookingLists();
  }, [isAuthenticated]);

  const reviewSubmit = async (e) => {
    e.preventDefault();
    setUpdateReivew(!updateReview);

    try {
      if (reviewTitle && reviewStory) {
        const reviewCreater = Moralis.Object.extend("Customer_Review");
        const review = new reviewCreater();
        const customerReview = {
          title: reviewTitle,
          story: reviewStory,
          imgUrl: imgUrl,
        };

        review.set("customerReview", customerReview);

        handleSuccess("");
        setReviewStory("");
        setReviewTitle("");

        await review.save();
        return review;
      } else {
        handleError("Please Type the Review");
      }
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    const fetchReview = async () => {
      const reviewList = Moralis.Object.extend("Customer_Review");
      const query = new Moralis.Query(reviewList);
      const results = await query.select("customerReview").find();
      let allReviews = [];

      results.forEach((e) => {
        allReviews.push({
          imgUrl: e.attributes.customerReview.imgUrl,
          story: e.attributes.customerReview.story,
          title: e.attributes.customerReview.title,
        });
      });

      setReviewList(allReviews);
    };
    fetchReview();
  }, [isAuthenticated, updateReview]);

  return (
    <nftContext.Provider
      value={{
        bookedList,
        imgUrl,
        setImgUrl,
        setReviewTitle,
        setReviewStory,
        reviewSubmit,
        reviewList,
        reviewTitle,
        reviewStory,
        updateReview,
        setUpdateReivew,
      }}
    >
      {children}
    </nftContext.Provider>
  );
};
