import { IoMdClose } from "react-icons/io";
import ReviewCard from "./ReviewCard";

const ShowReviews = ({ setShowReviews, book_title, reviews }) => {
    const handleClose = () => {
        setShowReviews(false);
    };
    return (
        <div className="z-30 w-screen h-screen fixed bg-black bg-opacity-40">
            <div className="mv:max-w-full mv:mx-5 sm:w-4/5 lg:w-1/2 h-max flex flex-col border-black rounded-lg bg-[#fef3ed] mx-auto mt-20 shadow-2xl p-5">
                <div className="flex justify-between items-center">
                    <p className="text-xl truncate">
                        <strong className="text-2xl">{book_title}</strong> reviews
                    </p>
                    <IoMdClose
                        onClick={handleClose}
                        className="cursor-pointer duration-200 hover:text-orange-0 mv:text-5xl md:text-3xl"
                    />
                </div>
                <div className="flex flex-col max-h-96 overflow-auto">
                    {reviews.map((rev) => (
                        <ReviewCard review={rev} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShowReviews;
