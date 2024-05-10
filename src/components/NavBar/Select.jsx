import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "../Buttons/LogoutButton";
import { IoMdAdd } from "react-icons/io";

const Select = ({ selectMenuOpen, setSelectMenuOpen }) => {
  const { isAuthenticated, user } = useAuth0(); // Obtiene el estado de autenticación del usuario
  const adminEmail = "openbooklibrary.dev@gmail.com";

  const data = [];

  return (
    <>
      {selectMenuOpen && (
        <div className="z-50 text-lg">
          <div className="bg-[#fef3ed]  p-5 flex flex-col gap-2 rounded-xl mt-16 mx-auto w-60 h-auto shadow-md">
            {user.user_type === "shopper" && (
              <>
                <Link
                  to="/profile"
                  onClick={() => setSelectMenuOpen(!selectMenuOpen)}
                  className="hover:bg-white-2 py-1 px-2 rounded-lg transition-colors delay-50"
                >
                  Profile
                </Link>

                <Link
                  to="/Favourites"
                  className="hover:bg-white-2 py-1 px-2 rounded-lg transition-colors delay-50"
                  onClick={() => setSelectMenuOpen(!selectMenuOpen)}
                >
                  <button className="flex flex-row gap-2 align-middle my-auto">
                    <div className="my-auto">
                      <MdFavoriteBorder />
                    </div>
                    <div>Favorites</div>
                  </button>
                </Link>
              </>
            )}
            <LogoutButton onClick={() => setSelectMenuOpen(!selectMenuOpen)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Select;
