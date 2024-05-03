import { Rating } from "@mui/material";

const ReviewCard = ({ review }) => {
    const { rating, comment, date, user } = review;

    return (
        <div
            className={
                rating < 2.5
                    ? "bg-orange-0 bg-opacity-20 my-2 rounded-xl px-3"
                    : "bg-cyan-0 bg-opacity-30 my-2 rounded-xl px-3"
            }
        >
            <Rating size="small" readOnly precision={0.5} value={rating} />
            <p className="text-gray-700 text-lg">{comment}</p>
            <div className="flex mb-1">
                <p className="text-sm text-gray-700 mr-3">{user.user_name}</p>
                <p className="text-sm text-gray-700">{date}</p>
            </div>
        </div>
    );
};

export default ReviewCard;
