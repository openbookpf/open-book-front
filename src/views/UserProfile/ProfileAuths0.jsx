import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveuser } from "../../redux/actions";

const ProfileAuth0 = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const dispatch = useDispatch();
  if (isLoading) {
    return <div>Loading ...</div>;
  } else {
    dispatch(saveuser(user));
  }

  // useEffect(() => {
  //   if (isAuthenticated === true) {
  //     setSaveuser(user);
  //   } else {
  //     setSaveuser(null);
  //   }
  // }, [isAuthenticated, user]);

  return (
    isAuthenticated && (
      <div className="text-center flex flex-col mt-20">
        <img className="w-20" src={user.picture} alt={user.name} />
        <h2 className="text-3xl">{user.name}</h2>
        <p>{user.email}</p>
        <pre>{JSON.stringify(user)}</pre>
      </div>
    )
  );
};

export default ProfileAuth0;
