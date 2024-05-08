import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardProfile from "./CardProfile";
import { Link } from "react-router-dom";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { MdHeartBroken } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { getBookColectionUser } from "../../redux/actions";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import ShowAllColection from "../../components/ShowAllColection/ShowAllColection";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [firstIndexFav, setFirstIndexFav] = useState(0);
  const [lastIndexFav, setLastIndexFav] = useState(4);
  const [firstIndexCol, setFirstIndexCol] = useState(0);
  const [lastIndexCol, setLastIndexCol] = useState(4);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showAllColection, setShowAllColection] = useState(false);

  const [bookISBN, setBookISBN] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [newuser, setNewuser] = useState([]);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      console.log(user.sub);
      dispatch(getBookColectionUser(user.sub));
    }
  }, [isAuthenticated]);
  useEffect(() => {
    fetch(`http://localhost:3001/users/findbyidAuth0/${user.sub}`)
      .then((res) => res.json())
      .then((data) => setNewuser(data.favorites));
  }, [user]);

  const favorites = useSelector((state) => state.favorites);
  const colection = useSelector((state) => state.bookColectionUser);
  console.log(colection);

  if (!isAuthenticated) {
    return (
      <div className="text-center flex flex-col mt-20">
        <p>Please, log in to see your profile.</p>
      </div>
    );
  }

  const handleShowAllColection = () => {
    setShowAllColection(true);
  };

  const handlenextFav = () => {
    if (favorites.length !== lastIndexFav) {
      setFirstIndexFav(firstIndexFav + 1);
      setLastIndexFav(lastIndexFav + 1);
    }
  };

  const handleprevFav = () => {
    if (firstIndexFav > 0) {
      setFirstIndexFav(firstIndexFav - 1);
      setLastIndexFav(lastIndexFav - 1);
    }
  };

  const handlenextCol = () => {
    if (colection.purchase_books.length !== lastIndexCol) {
      setFirstIndexCol(firstIndexCol + 1);
      setLastIndexCol(lastIndexCol + 1);
    }
  };

  const handleprevCol = () => {
    if (firstIndexCol > 0) {
      setFirstIndexCol(firstIndexCol - 1);
      setLastIndexCol(lastIndexCol - 1);
    }
  };

  const handleEditProfileClick = () => {
    console.log("Editar perfil");
    navigate("/edituser");
  };

  return (
    <div className="flex ">
      <div className="bg-[#fef3ed] h-3/5 w-96 mt-32 rounded-xl shadow-lg mr-5 ml-32 flex flex-col">
        <div className="grow flex flex-col text-center mx-auto py-14 ">
          <img
            className="w-40 mx-auto rounded-full"
            src={user.picture}
            alt={user.name}
          />
          <h2 className="text-2xl font-semibold mt-2">{user.name}</h2>
          <p className="text-lg font-light mt-1">{user.email}</p>
        </div>

        <div className="h-10 bg-cyan-0 my-8 mx-8 rounded-full flex justify-center duration-200 hover:scale-105">
          <button
            onClick={handleEditProfileClick}
            className="text-white-0 text-xl"
          >
            Edit Profile
          </button>
        </div>
      </div>

      <div className="mt-32 mr-32 ml-10 grow">
        <div className="bg-[#fef3ed] mb-10 rounded-xl pt-3 px-5 flex flex-col h-[410px] shadow-lg">
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
          <div className="flex overflow-x-auto w-[800px]">
            {colection.purchase_books && colection.purchase_books.length > 4 ? (
              <button className="flex items-center">
                <IoIosArrowDropleftCircle
                  onClick={handleprevCol}
                  className={
                    firstIndexCol === 0
                      ? "text-gray-300 cursor-default"
                      : "text-cyan-0 cursor-pointer"
                  }
                />
              </button>
            ) : null}
            {colection.purchase_books && colection.purchase_books.length ? (
              colection.purchase_books
                .slice(firstIndexCol, lastIndexCol)
                .map((col) => (
                  <div key={col.ISBN}>
                    <CardProfile
                      setBookTitle={setBookTitle}
                      setBookISBN={setBookISBN}
                      setShowReviewForm={setShowReviewForm}
                      review={true}
                      book={col}
                    />
                  </div>
                ))
            ) : (
              <div className="mt-20 flex flex-col justify-center items-center w-[800px]">
                <p className="text-xl">You don't have favorite books yet</p>
                <MdHeartBroken className="text-orange-0 opacity-60" />
              </div>
            )}
            {colection.purchase_books && colection.purchase_books.length > 4 ? (
              <button className="flex items-center">
                <IoIosArrowDroprightCircle
                  onClick={handlenextCol}
                  className={
                    lastIndexCol === colection.purchase_books.length
                      ? "text-gray-300 cursor-default"
                      : "text-cyan-0 cursor-pointer"
                  }
                />
              </button>
            ) : null}
          </div>
        </div>

        <div className="bg-[#fef3ed] mb-10 rounded-xl py-3 px-5 flex flex-col h-[410px] shadow-lg">
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
          <div className="flex overflow-x-auto w-[800px]">
            {newuser.length > 4 ? (
              <button className="flex items-center">
                <IoIosArrowDropleftCircle
                  onClick={handleprevFav}
                  className={
                    firstIndexFav === 0
                      ? "text-gray-300 cursor-default"
                      : "text-cyan-0 cursor-pointer"
                  }
                />
              </button>
            ) : null}
            {newuser.length ? (
              newuser.slice(firstIndexFav, lastIndexFav).map((fav) => (
                <div key={fav.fav_id}>
                  <CardProfile book={fav} />
                </div>
              ))
            ) : (
              <div className="mt-20 flex flex-col justify-center items-center w-[800px]">
                <p className="text-xl">You don't have favorite books yet</p>
                <MdHeartBroken className="text-orange-0 opacity-60" />
              </div>
            )}
            {newuser.length > 4 ? (
              <button className="flex items-center">
                <IoIosArrowDroprightCircle
                  onClick={handlenextFav}
                  className={
                    lastIndexFav === favorites.length
                      ? "text-gray-300 cursor-default"
                      : "text-cyan-0 cursor-pointer"
                  }
                />
              </button>
            ) : null}
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
