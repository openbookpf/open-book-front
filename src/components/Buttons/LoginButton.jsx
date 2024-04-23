import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className="text-sm rounded-xl bg-blue-0 text-white-0 px-4 hover:scale-105 transition-transform delay-50"
      onClick={() => loginWithRedirect()}
    >
      Login{" "}
    </button>
  );
};

export default LoginButton;
