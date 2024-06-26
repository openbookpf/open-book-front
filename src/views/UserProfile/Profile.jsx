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
    </div>
  );
};

export default Profile;
