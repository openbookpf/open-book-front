import React from "react";
import { Link, useNavigate } from "react-router-dom";
import notFoundPage from "../../assets/notFoundPage.jpg";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-col justify-center content-center align-center mt-20 h-screen">
      <div className="w-full flex justify-center">
        <img
          className="w-1/6"
          src={notFoundPage}
          alt="ERROR 404 PAGE NOT FOUND"
        />
      </div>
      <div className="w-full flex justify-center">
        <button
          className="round rounded-lg border border-orange-0 p-1 px-2 bg-orange-0 text-white-1 font-bold"
          onClick={handleGoHome}
        >
          GO HOME
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
