import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import Swal from "sweetalert2";
import { MdError } from "react-icons/md";
import { Tooltip } from "react-tooltip";

const ReviewForm = (props) => {
    const { setShowReviewForm, userId, bookISBN, bookTitle } = props;

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const currentDate = `${day}/${month}/${year}`;

    const [review, setReview] = useState({
        rating: "",
        comment: "",
        date: currentDate,
        userUserId: userId,
        bookISBN: bookISBN,
    });

    const [errorForm, setErrorForm] = useState({
        rating: "",
        comment: "",
    });

    const submitReview = async () => {
        if (!review.rating && !review.comment) {
            return setErrorForm({ ...errorForm, rating: "This field is required", comment: "This field is required" });
        } else if (!review.rating) {
            return setErrorForm({ ...errorForm, rating: "This field is required" });
        } else if (!review.comment) {
            return setErrorForm({ ...errorForm, comment: "This field is required" });
        }

        console.log(review);

        axios
            .post("https://open-book-back.onrender.com/reviews", review)
            .then(({ data }) => {
                console.log(data);
                Swal.fire({
                    title: "The review was done correctly!",
                    text: "",
                    icon: "success",
                    confirmButtonText: "Ok",
                    confirmButtonColor: "#81B29A",
                    background: "#fef3ed",
                    allowOutsideClick: false,
                });
                // .then((result) => {
                //     if (result.isConfirmed) {
                //         handleClose();
                //     }
                // });
            })
            .catch(() => {
                Swal.fire({
                    title: "Error",
                    text: "Something went wrong when loading the review, check the data and try again",
                    icon: "error",
                    confirmButtonText: "Ok",
                    confirmButtonColor: "#D34720",
                    background: "#fef3ed",
                });
            });
    };

    const handleRating = (event) => {
        const value = event.target.value;
        setReview({ ...review, rating: Number(value) });
        setErrorForm({ ...errorForm, rating: "" });
    };

    const handleReview = (event) => {
        const value = event.target.value;
        setReview({ ...review, comment: value });

        if (!value) {
            setErrorForm({ ...errorForm, comment: "This field is required" });
        } else {
            setErrorForm({ ...errorForm, comment: "" });
        }
    };

    const handleClose = () => {
        setShowReviewForm(false);
    };

    return (
        <div className="z-30 w-screen h-screen fixed bg-black bg-opacity-30">
            <div className="container w-1/2 h-max flex flex-col border-black rounded-lg bg-[#fef3ed] bg-opacity-95 mx-auto mt-20 shadow-2xl p-5">
                <div className="flex justify-between items-center">
                    <p className="text-xl truncate">
                        Add a review for <strong className="text-2xl">{bookTitle}</strong>
                    </p>
                    <IoMdClose
                        onClick={handleClose}
                        className="cursor-pointer duration-200 hover:text-orange-0 text-3xl"
                    />
                </div>
                <div className="flex flex-col text-lg">
                    <div className="flex my-4 items-center">
                        <p className="text-lg mr-4">Rating:</p>
                        <Rating onChange={handleRating} size="large" precision={0.5} />
                        <MdError
                            data-tooltip-id="rating"
                            data-tooltip-content={errorForm.rating}
                            className={errorForm.rating ? "text-orange-0 ml-1 text-2xl" : "hidden"}
                        />
                        <Tooltip id="rating" />
                    </div>
                    <textarea
                        data-tooltip-id="comment"
                        data-tooltip-content={errorForm.comment}
                        placeholder="Leave a book review"
                        onChange={handleReview}
                        type="text"
                        className={
                            errorForm.comment
                                ? "p-1 h-40 text-2xl border-orange-0 border-2 rounded-xl max-h-80"
                                : "p-1 h-40 text-2xl border-gray-400 border-2 rounded-xl max-h-80"
                        }
                    />
                    {errorForm.comment ? <Tooltip id="comment" /> : null}

                    <div className="flex justify-end">
                        <button
                            onClick={submitReview}
                            className="bg-cyan-0 w-52 rounded-xl text-white-0 mt-3 text-2xl duration-200 hover:scale-105 "
                        >
                            Send review
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewForm;
