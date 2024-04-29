import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import CardProfile from "./CardProfile";
import { Link } from "react-router-dom";

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

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
                <div className="bg-[#fef3ed] mb-10 rounded-xl pt-3 px-5 flex flex-col h-[400px] shadow-lg">
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
                        <CardProfile />
                        <CardProfile />
                        <CardProfile />
                    </div>
                </div>

                <div className="bg-[#fef3ed] mb-10 rounded-xl pt-3 px-5 flex flex-col h-[400px] shadow-lg">
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
                    <div className="flex overflow-x-auto w-[800px]"></div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
