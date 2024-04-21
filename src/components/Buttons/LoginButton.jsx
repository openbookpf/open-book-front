import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className="text-md  hover:scale-110 transition-transform delay-50"
      onClick={() => loginWithRedirect()}
    >
      Login{" "}
    </button>
  );
};

export default LoginButton;
