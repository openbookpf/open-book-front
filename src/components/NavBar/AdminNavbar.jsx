import React from "react";
import { IoMdAdd } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

const AdminNavbar = () => {
  const location = useLocation();

  return (
    <>
      <div className="w-full flex flex-row text-base justify-start ml-8 gap-10">
        <div className="flex flex-row font-medium gap-5 my-auto">
          <Link
            to="/"
            className="hover:bg-white-2 p-2 rounded-lg transition-colors delay-50"
          >
            Dashboard
          </Link>
          <Link
            to="/products"
            className="hover:bg-white-2 p-2 rounded-lg transition-colors delay-50"
          >
            Products
          </Link>
          <Link
            to="/users"
            className="hover:bg-white-2 p-2 rounded-lg transition-colors delay-50"
          >
            Users
          </Link>
        </div>
        {location.pathname !== "/products" && (
          <Link
            to="/create_book"
            className="text-white-0 hover:bg-[#D48620] px-2 bg-orange-0 align-middle my-1 rounded-lg font-medium transition-colors delay-50"
          >
            <div className="flex flex-row gap-1 p-2">
              <p className=" text-sm">Add Book</p>
              <IoMdAdd className="text-xl" />
            </div>
          </Link>
        )}
      </div>
    </>
  );
};

export default AdminNavbar;
