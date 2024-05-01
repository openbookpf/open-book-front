import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "../Buttons/LogoutButton";
import { IoMdAdd } from "react-icons/io";

const Select = ({ selectMenuOpen }) => {
  const { isAuthenticated, user } = useAuth0(); // Obtiene el estado de autenticación del usuario
  const adminEmail = "openbooklibrary.dev@gmail.com";

  const data = [];

  return (
    <>
      {selectMenuOpen && (
        <div className="z-50 text-lg">
          <div className="bg-[#fef3ed] p-5 flex flex-col gap-2 rounded-xl mt-16 mx-auto w-60 h-auto shadow-md">
            <Link to="/profile" className="transition-transform delay-50">
              Profile
            </Link>
            {user.email === adminEmail ? (
              <>
                <Link
                  to="/admin"
                  className="align-middle p-1 transition-transform delay-50"
                >
                  Dashboard
                </Link>
                {/* <Link
                  to="/create_book"
                  className="text-white-0 hover:bg-[#D48620] bg-orange-0 align-middle my-auto rounded-lg text-sm font-medium hover:scale-105 transition-transform delay-50"
                >
                  <div className="flex flex-row gap-1 p-1 align-middle mx-auto my-auto">
                    <p className="my-auto px-2"> Add Book</p>
                    <IoMdAdd className="text-2xl " />
                  </div>
                </Link> */}
              </>
            ) : (
              <>
                <Link to="/Favourites">
                  <button className="flex flex-row gap-2 align-middle my-auto">
                    <div className="my-auto">
                      <MdFavoriteBorder />
                    </div>
                    <div>Favourites</div>
                  </button>
                </Link>
              </>
            )}
            <LogoutButton />
          </div>
        </div>
      )}
    </>
  );
};

export default Select;
