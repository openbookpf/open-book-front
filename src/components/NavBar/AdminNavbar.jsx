import React from "react";
import { IoMdAdd } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

const AdminNavbar = () => {
  const location = useLocation();

  return (
    <>
      <div className="w-full flex flex-row justify-start ml-8 gap-10">
        <div className="flex flex-row font-medium gap-5 my-auto">
          <Link
            to="/"
            className="text-black hover:underline hover:scale-110 py-1 transition-transform delay-50"
          >
            Dashboard
          </Link>
          <Link
            to="/products"
            className="py-1 text-black  hover:underline hover:scale-15 transition-transform delay-50"
          >
            Products
          </Link>
          <Link
            to="/users"
            className="py-1 text-black  hover:underline hover:scale-15 transition-transform delay-50"
          >
            Users
          </Link>
        </div>
        {location.pathname === "/products" && (
          <Link
            to="/create_book"
            className="text-white-0 hover:bg-[#D48620] bg-orange-0 align-middle rounded-lg font-medium hover:scale-105 transition-transform delay-50"
          >
            <div className="flex flex-row gap-1 p-1 align-middle mx-auto my-auto text-sm">
              <p className="my-auto px-2">Add Book</p>
              <IoMdAdd className="text-2xl " />
            </div>
          </Link>
        )}
      </div>
    </>
  );
};

export default AdminNavbar;
