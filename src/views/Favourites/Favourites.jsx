import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromFavorites } from "../../redux/actions";
import Card from "../../components/Card/Card";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const handleRemoveFromFavorites = (ISBN) => {
    dispatch(removeFromFavorites(ISBN));
  };

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto max-w-7xl py-28 px-5">
      {favorites.map((favorite) => (
        <div key={favorite.ISBN} className="relative">
          <Card
            book={favorite}
            favorites={favorites}
            showFavoriteButton={true}
          />
          {/* <button
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition duration-300 ease-in-out"
            onClick={() => handleRemoveFromFavorites(favorite.ISBN)}
          >
            <IoMdClose />
          </button> */}
        </div>
      ))}
    </div>
  );
};

export default Favorites;
