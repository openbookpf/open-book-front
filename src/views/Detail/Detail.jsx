import { MdFavoriteBorder } from "react-icons/md";
import { BsFacebook, BsWhatsapp, BsTwitterX } from "react-icons/bs";
import axios from "axios";
import { Carousel } from "primereact/carousel";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions";
import Card from "../../components/Card/Card";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import ShowReviews from "../../components/ReviewCard/ShowReviews";
import { Rating } from "@mui/material";

function Detail() {
    const { isbn } = useParams();
    const [bookData, setBookData] = useState(null);
    const [sameGenreBooks, setSameGenreBooks] = useState([]);
    const [showReviews, setShowReviews] = useState(false);

    const apiUrl = `https://open-book-back.onrender.com/books/book-id/${isbn.replace(/\D/g, "")}`;
    const dispatch = useDispatch();

    useEffect(() => {
        async function getBookById() {
            try {
                const response = await axios.get(apiUrl);
                setBookData(response.data);
            } catch (error) {
                console.error("Error al obtener el libro:", error);
            }
        }

        getBookById();
    }, [isbn]);

    useEffect(() => {
        async function getBooksByGenre() {
            if (!bookData || !bookData.genres) {
                return;
            }

            try {
                const genres = bookData.genres;
                const apiUrl = "https://open-book-back.onrender.com/books/filtrar";
                const requestBody = {
                    authorArray: [],
                    genreArray: genres,
                };
                const response = await axios.post(apiUrl, requestBody);
                setSameGenreBooks(response.data);
            } catch (error) {
                console.error("Error al obtener los libros del mismo género:", error);
            }
        }

        getBooksByGenre();
    }, [bookData]);

    const bookTemplate = (book) => {
        return <Card book={book} showFavoriteButton={true} key={book.ISBN} />;
    };

    const handleAddToCart = () => {
        if (bookData) {
            const productToAdd = { ...bookData };
            dispatch(addToCart(productToAdd));
        }
    };

    if (!bookData) {
        return null;
    }

    const handleShowReviews = () => {
        setShowReviews(true);
    };

    const { book_cover_url, book_title, author, price, book_description, genres, reviews, average_rating } = bookData;

    const responsiveOptions = [
        {
            breakpoint: "650px",
            numVisible: 1,
            numScroll: 1,
        },
        {
            breakpoint: "980px",
            numVisible: 2,
            numScroll: 1,
        },
        {
            breakpoint: "1340px",
            numVisible: 3,
            numScroll: 2,
        },
        {
            breakpoint: "1350px",
            numVisible: 4,
            numScroll: 2,
        },
        {
            breakpoint: "1360",
            numVisible: 5,
            numScroll: 2,
        },
    ];

    return (
        <div className="flex flex-col">
            <div className="bg-[#fef3ed] rounded-3xl mv:mx-4 md:mx-20 mt-24 mb-10 shadow-md">
                <div className=" py-10 px-15">
                    <div className="flex flex-col mx-auto">
                        <div className="text-right mv:mb-0 md:mb-3 text-sm flex flex-row mv:justify-center md:justify-end mv:px-2 md:pr-44 gap-2">
                            <p className="text-gray-400">Home/books/allBooks/</p>
                            <p className="font-semibold truncate">{book_title}</p>
                        </div>
                        <div className="flex mv:flex-col mv:items-center lg:items-start lg:flex-row justify-center p-5">
                            <div className="overflow-auto">
                                <img
                                    src={book_cover_url}
                                    alt={book_title}
                                    className="rounded-lg w-96 object-cover shadow-lg"
                                />
                            </div>
                            <div className="mv:w-[95%]  lg:w-1/2 lg:ml-20 mt-4 lg:mt-0">
                                <h2 className="text-5xl font-bold text-gray-800">{book_title}</h2>
                                <p className="text-gray-700 font-bold mt-2">{author}</p>
                                <p className="text-gray-700 mt-2">${price}</p>
                                <div className="mt-4 flex space-x-4">
                                    <button
                                        onClick={handleAddToCart}
                                        className="max-h-10 bg-orange-0 hover:bg-orange-700 hover:scale-105 font-medium transition-transform delay-100 ease-linear text-white-0 text-lg py-1 mv:px-5 md:px-16 focus:outline-none focus:shadow-outline rounded-full"
                                    >
                                        Add to cart
                                    </button>
                                    <button className="bg-cyan-0 hover:bg-cyan-700 text-2xl text-white-0 py-1 px-4 focus:outline-none hover:scale-110 transition-transform delay-100 ease-linear focus:shadow-outline rounded-full">
                                        <MdFavoriteBorder />
                                    </button>
                                </div>
                                <hr className="my-6 border-gray-300 w-full" />
                                <p className="text-gray-700 mt-4 font-bold text-xl">Description:</p>
                                <p className="text-gray-700 mt-2 mv:text-md md:text-sm">{book_description}</p>
                                <p className="text-gray-700 mt-4 font-bold text-xl">Genres:</p>
                                <div className="mt-2 flex space-x-4">
                                    {genres.map((genre, index) => (
                                        <Link
                                            to={`/filterbook/${genre}`}
                                            className="bg-blue-0 hover:bg-blue-950 ease-linear delay-50 transition-colors text-white-0 text-base py-1 px-10 focus:outline-none focus:shadow-outline rounded-full"
                                            key={index}
                                        >
                                            <button>{genre}</button>
                                        </Link>
                                    ))}
                                </div>
                                {/* <hr className="my-4 border-gray-300 w-full" />
                                <p className="text-gray-700 mt-2 mb-4 font-bold text-xl">Share:</p>
                                <div className="mt-1 mb-3 flex space-x-4">
                                    <BsFacebook className="hover:scale-125 transition-transform delay-50 ease-linear cursor-pointer" />
                                    <BsTwitterX className="hover:scale-125 transition-transform delay-50 ease-linear cursor-pointer" />
                                    <BsWhatsapp className="hover:scale-125 transition-transform delay-50 ease-linear cursor-pointer" />
                                </div> */}
                                <hr className="my-4 border-gray-300 w-full" />
                                <div className="flex flex-col">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center mb-2">
                                            <p className="text-gray-700 font-bold text-xl mr-2">Reviews:</p>
                                            <Rating size="large" readOnly precision={0.5} value={average_rating} />
                                        </div>
                                        <button
                                            onClick={handleShowReviews}
                                            className="md:flex mv:hidden bg-cyan-0 px-2 rounded-full text-lg mr-3 duration-200 hover:bg-opacity-70"
                                        >
                                            See all
                                        </button>
                                    </div>
                                    <div className="flex flex-col ">
                                        {reviews.slice(0, 3).map((rev) => (
                                            <ReviewCard review={rev} />
                                        ))}
                                    </div>
                                    <button
                                        onClick={handleShowReviews}
                                        className="md:hidden mv:flex bg-cyan-0 w-24 justify-center mt-2 py-1 px-2 rounded-full text-xl mr-3 duration-200 hover:bg-opacity-70"
                                    >
                                        See all
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {sameGenreBooks.length > 0 ? (
                <div className="mv:mx-0 md:mx-5">
                    <p className="text-blue-0 my-8 mv:mx-4 md:mx-10 font-bold text-2xl">
                        Recommended in the same genre:
                    </p>
                    <div className="mx-auto mv:pr-5 md:pr-0">
                        <Carousel
                            className="justify-center mx-0"
                            value={sameGenreBooks}
                            numVisible={5}
                            numScroll={2}
                            responsiveOptions={responsiveOptions}
                            itemTemplate={bookTemplate}
                            autoplayInterval={5000}
                        />
                    </div>
                </div>
            ) : (
                <div className="mx-20">
                    <p className="text-blue-0 my-8 font-bold text-2xl">
                        At the moment, we don't have any other books available in this genre.
                    </p>
                </div>
            )}
            {showReviews ? (
                <ShowReviews reviews={reviews} book_title={book_title} setShowReviews={setShowReviews} />
            ) : null}
        </div>
    );
}

export default Detail;
