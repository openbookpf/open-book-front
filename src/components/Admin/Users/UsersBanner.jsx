import React from "react";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";

const UsersBanner = () => {
  return (
    <div
      className="h-52 w-full mt-10 bg-blue-1"
      style={{
        backgroundImage:
          "linear-gradient(rgba(38, 39, 56, 0.8), rgba(61, 64, 91, 0.6)), url(https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        zIndex: 0,
        backgroundSize: "cover",
      }}
    >
      {" "}
      <div className="flex flex-col justify-center gap-1 mt-6 z-10 text-white-0">
        <h1 className="text-4xl mt-1 font-semibold text-center">
          OpenBook Users
        </h1>
        <p className="text-sm font-normal text-center">
          Create, update and delete the users we have in our database.
        </p>
      </div>
      <div className="flex flex-row justify-center gap-6 mt-10 z-10">
        <h1 className="text-xl z-30 font-semibold text-white-0">
          Register a new user
        </h1>
        <button className="h-10 z-30 hover:bg-[#D48620] bg-orange-0 transition-colors delay-50 rounded-lg font-medium">
          <Link
            to="/create_user"
            className="text-white-0  hover:scale-105 transition-transform delay-50"
          >
            <div className="flex flex-row gap-1 p-1 align-middle mx-auto my-auto text-sm">
              <p className="my-auto px-2">Create</p>
              <IoMdAdd className="text-2xl " />
            </div>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default UsersBanner;
