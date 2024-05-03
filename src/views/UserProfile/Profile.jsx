import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardProfile from "./CardProfile";
import { Link } from "react-router-dom";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { MdHeartBroken } from "react-icons/md";

{
    /* <IoIosArrowDropleftCircle /> */
} //iz
{
    /* <IoIosArrowDroprightCircle /> */
} //der

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [firstIndexFav, setFirstIndexFav] = useState(0);
    const [lastIndexFav, setLastIndexFav] = useState(4);

    const favorites = useSelector((state) => state.favorites);
    // console.log(favorites);

    if (!isAuthenticated) {
        return (
            <div className="text-center flex flex-col mt-20">
                <p>Por favor, inicia sesión</p>
            </div>
        );
    }

    const handleEditProfileClick = () => {
        console.log("Editar perfil");
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

    return (
        <div className="flex ">
            <div className="bg-[#fef3ed] h-3/5 w-96 mt-32 rounded-xl shadow-lg mr-5 ml-32 flex flex-col">
                <div className="grow flex flex-col text-center mx-auto py-14 ">
                    <img className="w-40 mx-auto rounded-full" src={user.picture} alt={user.name} />
                    <h2 className="text-2xl font-semibold mt-2">{user.name}</h2>
                    <p className="text-lg font-light mt-1">{user.email}</p>
                </div>

                <div className="h-10 bg-cyan-0 my-8 mx-8 rounded-full flex justify-center duration-200 hover:scale-105">
                    <button onClick={handleEditProfileClick} className="text-white-0 text-xl">
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
                        <button className="bg-orange-0 text-white-0 px-4 rounded-full text-xl mt-1 h-8 w-28 duration-200 hover:scale-105">
                            See All
                        </button>
                    </div>
                    <div className="flex overflow-x-auto w-[800px] ">
                        <p className="text-red-500">completar con libros comprados, validar</p>
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
                        {favorites.length ? (
                            <div className="flex items-center">
                                <IoIosArrowDropleftCircle
                                    onClick={handleprevFav}
                                    className={firstIndexFav === 0 ? "text-gray-300" : "text-cyan-0 cursor-pointer"}
                                />
                            </div>
                        ) : null}
                        {favorites.length ? (
                            favorites.slice(firstIndexFav, lastIndexFav).map((fav) => <CardProfile book={fav} />)
                        ) : (
                            <div className="mt-20 flex flex-col justify-center items-center w-[800px]">
                                <p className="text-xl">You don't have favorite books yet</p>
                                <MdHeartBroken className="text-orange-0 opacity-60" />
                            </div>
                        )}
                        {favorites.length ? (
                            <div className="flex items-center">
                                <IoIosArrowDroprightCircle
                                    onClick={handlenextFav}
                                    className={
                                        lastIndexFav === favorites.length
                                            ? "text-gray-300"
                                            : "text-cyan-0 cursor-pointer"
                                    }
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

{
    /* <CardProfile book={fav} /> */
}
