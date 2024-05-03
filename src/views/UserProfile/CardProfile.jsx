import { FaRegStar } from "react-icons/fa6";
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";

const CardProfile = (props) => {
    const { setBookTitle, book, setBookISBN, setShowReviewForm, space } = props;

    const handleShowReview = () => {
        setBookTitle(book.book_title);
        setBookISBN(book.ISBN);
        setShowReviewForm(true);
    };

    if (!book) {
        return null; // O puedes retornar un mensaje de error o un componente alternativo
    }

    return (
        <div
            className={
                space
                    ? "h-80 min-w-40 max-w-40 mx-10 mt-5 p-2 rounded-xl relative text-sm"
                    : "h-80 min-w-40 max-w-40 mx-3 p-2 rounded-xl relative text-sm"
            }
        >
            <div className="relative">
                <img src={book.book_cover_url} alt={book.book_title} className="max-h-60 min-h-60 rounded-lg" />
                {props.review ? (
                    <div className="absolute top-1 right-0 p-2">
                        <FaRegStar
                            onClick={handleShowReview}
                            data-tooltip-id="review"
                            data-tooltip-content="Add review"
                            className="bg-gray-500 text-white-0 text-center text-3xl p-1 rounded-full duration-200 hover:bg-cyan-0 cursor-pointer"
                        />
                        <Tooltip id="review" />
                    </div>
                ) : null}
            </div>
            <Link to={`/detail/${book.ISBN}`}>
                <p className="font-bold truncate hover:underline hover:cursor-pointer delay-200 text-base w-full mt-2">
                    {book.book_title}
                </p>
            </Link>
            <p className="font-light text-sm">{book.author}</p>
        </div>
    );
};

export default CardProfile;
