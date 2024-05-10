import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardProfile from "./CardProfile";
import { Link } from "react-router-dom";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { MdHeartBroken } from "react-icons/md";
import { getBookColectionUser } from "../../redux/actions";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import ShowAllColection from "../../components/ShowAllColection/ShowAllColection";
import { Carousel } from "primereact/carousel";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showAllColection, setShowAllColection] = useState(false);

  const [bookISBN, setBookISBN] = useState("");
  const [bookTitle, setBookTitle] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      console.log(user.sub);
      dispatch(getBookColectionUser(user.sub));
    }
  }, [isAuthenticated]);

  const favorites = useSelector((state) => state.favorites);
  const colection = useSelector((state) => state.bookColectionUser);
  console.log(colection);

  if (!isAuthenticated || user.user_type === "admin") {
    return (
      <div className="text-center flex flex-col mt-20">
        <p>Please, log in as an user to see your profile.</p>
      </div>
    );
  }

  const handleShowAllColection = () => {
    setShowAllColection(true);
  };

  const handleEditProfileClick = () => {
    console.log("Edit profile");
  };

  const bookTemplateColection = (book) => {
    return (
      <CardProfile
        book={book}
        setBookTitle={setBookTitle}
        setBookISBN={setBookISBN}
        setShowReviewForm={setShowReviewForm}
        review={true}
      />
    );
  };

  const bookTemplateFavorites = (book) => {
    return <CardProfile book={book} />;
  };

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
      numScroll: 1,
    },
    {
      breakpoint: "1350px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "1360",
      numVisible: 3,
      numScroll: 1,
    },
  ];

  return (
    <div className="flex bg-gradient-to-b from-blue-1 to-cyan-0 mv:flex-col mv:items-center md:items-start xl:flex-row">
      <div className="bg-[#fef3ed] h-3/5 mv:min-w-80 md:min-w-96 mv:mt-20 md:mt-32 rounded-xl shadow-lg xl:mr-0 2xl:mr-5 xl:ml-10 2xl:ml-32 flex flex-col">
        <div className="grow flex flex-col text-center mx-auto py-12 ">
          <img
            className="w-40 mx-auto rounded-full"
            src={user.picture}
            alt={user.name}
          />
          <h2 className="text-2xl font-semibold mt-2">{user.name}</h2>
          <p className="text-lg font-light mt-1">{user.email}</p>
          <p className="text-sm font-light mt-1">{user.phone_number}</p>
          <p className="text-sm font-light">{user.address_street}</p>
        </div>

        <div className="h-10 bg-cyan-0  cursor-pointer mb-6 mt-0 mx-8 rounded-full flex justify-center duration-200 hover:scale-105">
          <Link
            to={"/edit-user-profile"}
            className="flex justify-center items-center"
          >
            <button className="text-white-0 text-xl">Edit Profile</button>
          </Link>
        </div>
      </div>

      <div className=" mv:mt-10 xl:mt-32 mv:mr-0 2xl:mr-32 mv:ml-0 xl:ml-10 grow pb-3">
        <div className="bg-[#fef3ed] mb-10 rounded-xl pt-3 px-5 flex flex-col h-[410px] shadow-lg mv:max-w-[370px] sm:min-w-[550px] md:min-w-[650px] lg:min-w-[860px]">
          <div className="flex">
            <div className="grow">
              <h2 className="text-xl font-bold">My Library</h2>
              <p className="text-lg mb-2">Books you bought</p>
            </div>
            <button
              onClick={handleShowAllColection}
              className="bg-orange-0 text-white-0 px-4 rounded-full text-xl mt-1 h-8 w-28 duration-200 hover:scale-105"
            >
              See All
            </button>
          </div>
          <div className=" flex mv:w-[370px] sm:w-[500px] md:w-[600px] lg:w-[800px] max-h-[320px] overflow-hidden">
            <div>
              {colection.purchase_books &&
                colection.purchase_books.length > 0 && (
                  <Carousel
                    className="mv:w-80 sm:w-[500px] md:w-[600px] lg:w-[800px]"
                    value={colection.purchase_books}
                    numVisible={3}
                    numScroll={1}
                    itemTemplate={bookTemplateColection}
                    autoplayInterval={5000}
                    responsiveOptions={responsiveOptions}
                  />
                )}
            </div>
          </div>
        </div>

        <div className="bg-[#fef3ed] mb-10 rounded-xl py-3 px-5 flex flex-col h-[410px] shadow-lg mv:max-w-[370px] sm:min-w-[550px] md:min-w-[650px] lg:min-w-[860px]">
          <div className="flex">
            <div className="grow">
              <h2 className="text-xl font-bold">WishList</h2>
              <p className="text-lg mb-2">Favorites books</p>
            </div>
            <Link
              to="/Favourites"
              className="bg-orange-0 text-white-0 px-4 rounded-full text-xl mt-1 h-8 w-28 duration-200 hover:scale-105 flex justify-center items-center"
            >
              See All
            </Link>
          </div>
          <div className=" flex mv:w-[370px] sm:w-[500px] md:w-[600px] lg:w-[800px] max-h-[320px] overflow-hidden">
            <div>
              <Carousel
                className="mv:w-80 sm:w-[500px] md:w-[600px] lg:w-[800px]"
                value={favorites.slice(0, 27)}
                numVisible={3}
                numScroll={1}
                itemTemplate={bookTemplateFavorites}
                autoplayInterval={5000}
                responsiveOptions={responsiveOptions}
              />
            </div>
          </div>
        </div>
      </div>
      {showReviewForm ? (
        <ReviewForm
          bookTitle={bookTitle}
          userId={user.sub}
          setShowReviewForm={setShowReviewForm}
          bookISBN={bookISBN}
        />
      ) : null}
      {showAllColection ? (
        <ShowAllColection
          setShowAllColection={setShowAllColection}
          colection={colection.purchase_books}
        />
      ) : null}
    </div>
  );
};

export default Profile;

{
  /* <CardProfile book={fav} /> */
}
//     return (
//         <div className="flex ">
//             <div className="bg-[#fef3ed] h-3/5 w-96 mt-32 rounded-xl shadow-lg mr-5 ml-32 flex flex-col">
//                 <div className="grow flex flex-col text-center mx-auto py-14 ">
//                     <img className="w-40 mx-auto rounded-full" src={user.picture} alt={user.name} />
//                     <h2 className="text-2xl font-semibold mt-2">{user.name}</h2>
//                     <p className="text-lg font-light mt-1">{user.email}</p>
//                 </div>

//                 <div className="h-10 bg-cyan-0 my-8 mx-8 rounded-full flex justify-center duration-200 hover:scale-105">
//                     <button onClick={handleEditProfileClick} className="text-white-0 text-xl">
//                         Edit Profile
//                     </button>
//                 </div>
//             </div>

//             <div className="mt-32 mr-32 ml-10 grow">
//                 <div className="bg-[#fef3ed] mb-10 rounded-xl pt-3 px-5 flex flex-col h-[410px] shadow-lg">
//                     <div className="flex">
//                         <div className="grow">
//                             <h2 className="text-xl font-bold">My Library</h2>
//                             <p className="text-lg mb-2">Books you bought</p>
//                         </div>
//                         <button
//                             onClick={handleShowAllColection}
//                             className="bg-orange-0 text-white-0 px-4 rounded-full text-xl mt-1 h-8 w-28 duration-200 hover:scale-105"
//                         >
//                             See All
//                         </button>
//                     </div>
//                     <div className="flex overflow-x-auto w-[800px]">
//                         {colection.purchase_books && colection.purchase_books.length > 4 ? (
//                             <button className="flex items-center">
//                                 <IoIosArrowDropleftCircle
//                                     onClick={handleprevCol}
//                                     className={
//                                         firstIndexCol === 0
//                                             ? "text-gray-300 cursor-default text-2xl m-5"
//                                             : "text-cyan-0 cursor-pointer text-2xl m-5"
//                                     }
//                                 />
//                             </button>
//                         ) : null}
//                         {colection.purchase_books && colection.purchase_books.length ? (
//                             colection.purchase_books.slice(firstIndexCol, lastIndexCol).map((col) => (
//                                 <div key={col.ISBN}>
//                                     <CardProfile
//                                         setBookTitle={setBookTitle}
//                                         setBookISBN={setBookISBN}
//                                         setShowReviewForm={setShowReviewForm}
//                                         review={true}
//                                         book={col}
//                                     />
//                                 </div>
//                             ))
//                         ) : (
//                             <div className="mt-20 flex flex-col justify-center items-center w-[800px]">
//                                 <p className="text-xl">You haven't bought any books yet</p>
//                                 <MdHeartBroken className="text-orange-0 opacity-60" />
//                             </div>
//                         )}
//                         {colection.purchase_books && colection.purchase_books.length > 4 ? (
//                             <button className="flex items-center">
//                                 <IoIosArrowDroprightCircle
//                                     onClick={handlenextCol}
//                                     className={
//                                         lastIndexCol === colection.purchase_books.length
//                                             ? "text-gray-300 cursor-default text-2xl m-5"
//                                             : "text-cyan-0 cursor-pointer text-2xl m-5"
//                                     }
//                                 />
//                             </button>
//                         ) : null}
//                     </div>
//                 </div>

//                 <div className="bg-[#fef3ed] mb-10 rounded-xl py-3 px-5 flex flex-col h-[410px] shadow-lg">
//                     <div className="flex">
//                         <div className="grow">
//                             <h2 className="text-xl font-bold">WishList</h2>
//                             <p className="text-lg mb-2">Favorites books</p>
//                         </div>
//                         <Link
//                             to="/Favourites"
//                             className="bg-orange-0 text-white-0 px-4 rounded-full text-xl mt-1 h-8 w-28 duration-200 hover:scale-105 flex justify-center items-center"
//                         >
//                             See All
//                         </Link>
//                     </div>
//                     <div className="flex overflow-x-auto w-[800px]">
//                         {favorites.length > 4 ? (
//                             <button className="flex items-center">
//                                 <IoIosArrowDropleftCircle
//                                     onClick={handleprevFav}
//                                     className={
//                                         firstIndexFav === 0
//                                             ? "text-gray-300 cursor-default text-2xl m-5"
//                                             : "text-cyan-0 cursor-pointer text-2xl m-5"
//                                     }
//                                 />
//                             </button>
//                         ) : null}
//                         {favorites.length ? (
//                             favorites.slice(firstIndexFav, lastIndexFav).map((fav) => (
//                                 <div key={fav.ISBN}>
//                                     <CardProfile book={fav} />
//                                 </div>
//                             ))
//                         ) : (
//                             <div className="mt-20 flex flex-col justify-center items-center w-[800px]">
//                                 <p className="text-xl">You don't have favorite books yet</p>
//                                 <MdHeartBroken className="text-orange-0 opacity-60" />
//                             </div>
//                         )}
//                         {favorites.length > 4 ? (
//                             <button className="flex items-center">
//                                 <IoIosArrowDroprightCircle
//                                     onClick={handlenextFav}
//                                     className={
//                                         lastIndexFav === favorites.length
//                                             ? "text-gray-300 cursor-default text-2xl m-5"
//                                             : "text-cyan-0 cursor-pointer text-2xl m-5"
//                                     }
//                                 />
//                             </button>
//                         ) : null}
//                     </div>
//                 </div>
//             </div>
//             {showReviewForm ? (
//                 <ReviewForm
//                     bookTitle={bookTitle}
//                     userId={user.sub}
//                     setShowReviewForm={setShowReviewForm}
//                     bookISBN={bookISBN}
//                 />
//             ) : null}
//             {showAllColection ? (
//                 <ShowAllColection setShowAllColection={setShowAllColection} colection={colection.purchase_books} />
//             ) : null}
//         </div>
//     );
// };

// export default Profile;

// {
//     /* <CardProfile book={fav} /> */
// }
