import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";

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
    <div className="text-white-0 bg-blue-0 h-auto w-72 mt-20 mx-auto rounded-lg shadow-md">
      <div className="flex flex-col text-center mx-auto py-14">
        <img
          className="w-36 mx-auto rounded-full"
          src={user.picture}
          alt={user.name}
        />
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-sm font-light">{user.email}</p>
      </div>

      <div className="bg-cyan-0 hover:bg-gray-500 p-2 rounded-md mb-2">
          <button onClick={handleEditProfileClick} className="text-white-0">
            Edit Profile
          </button>
        </div>

        <div className="rounded-lg shadow-md flex justify-end items-start absolute top-0 right-10 mr-20 mt-32 bg-blue-0">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-100">My Library 📚</h2>
            <p className="text-sm text-gray-100 mb-2">Books you bought</p>
            <button className="bg-orange-0 hover:bg-orange-500 text-white-0 px-4 py-2 rounded-md">
              See All
            </button>
          </div>
        </div>

        <div className="rounded-lg shadow-md flex justify-end items-start absolute top-0 right-10 mr-20 mt-80 bg-blue-0">
          <div className="bg-white p-10 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-100">WishList ✨</h2>
            <p className="text-sm text-gray-100 mb-2">Favorites books</p>
            <button className="bg-orange-0 hover:bg-orange-500 text-white-0 px-4 py-2 rounded-md">
              See All
            </button>
          </div>
        </div>

    </div>
  );
};

export default Profile;
