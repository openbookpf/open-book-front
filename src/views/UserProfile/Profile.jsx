import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="text-center flex flex-col mt-20">
        <p>Por favor inicia sesión</p>
      </div>
    );
  }

  return (
    <div className="text-center flex flex-col mt-20">
      <h2 className="text-3xl">{user.name}</h2>
      <p>{user.email}</p>
      <img className="w-20" src={user.picture} alt={user.name} />
    </div>
  );
};

export default Profile;
