import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const ReviewForm = () => {
    const [review, setReview] = useState({
        rating: "",
        review: "",
    });

    const bookTitle = "Harry Potter And The Chamber Of Secrets (Book 2)";

    const handleRating = (event) => {
        const value = event.target.value;
        setReview({ ...review, rating: value });
    };

    const handleReview = (event) => {
        const value = event.target.value;
        setReview({ ...review, review: value });
    };

    //! enviar la peticion a al back para que cree la review
    //! Crear handleClose
    return (
        <div className="z-30 w-screen h-screen fixed bg-black bg-opacity-30">
            <div className="container w-1/2 h-max flex flex-col border-black rounded-lg bg-[#fef3ed] bg-opacity-95 mx-auto mt-20 shadow-2xl p-5">
                <div className="flex justify-between items-center">
                    <p className="text-xl truncate">
                        Add a review for <strong className="text-2xl">{bookTitle}</strong>
                    </p>
                    <IoMdClose className="cursor-pointer duration-200 hover:text-orange-0 text-3xl" />
                </div>
                <div className="flex flex-col">
                    <div className="flex my-4 items-center">
                        <p className="text-lg mr-4">Rating:</p>
                        <Rating onChange={handleRating} size="large" precision={0.5} />
                    </div>
                    <textarea
                        placeholder="Leave a book review"
                        onChange={handleReview}
                        type="text"
                        className=" p-1 h-40 text-2xl border-gray-400 border-2 rounded-xl max-h-80"
                    />
                    <div className="flex justify-end">
                        <button className="bg-cyan-0 w-52 rounded-xl text-white-0 mt-3 text-2xl duration-200 hover:scale-105 ">
                            Send review
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewForm;
