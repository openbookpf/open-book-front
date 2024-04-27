import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import Searchbar from "../Searchbar/Searchbar";
import { useSelector } from "react-redux";
import logo from "../../assets/TrasparentLightMoodLogo.png";
import LogoutButton from "../Buttons/LogoutButton";
import LoginButton from "../Buttons/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import SelectLabels from "./Select";
import Select from "./Select";
import SelectButton from "../Buttons/SelectButton";

const NavBar = () => {
  const [trigger, setTrigger] = React.useState(false);
  const [selectMenuOpen, setSelectMenuOpen] = useState(false); // Define selectMenuOpen y setSelectMenuOpen
  const cartCounter = useSelector((state) => state.totalItems || 0);
  const location = useLocation();
  const { isAuthenticated, user } = useAuth0(); // Obtiene el estado de autenticación del usuario
  const adminEmail = "openbooklibrary.dev@gmail.com";
  return (
    <div>
      <nav
        className="z-30 flex flex-row fixed shadow-md bg-[#fef3ed] justify-between font-semibold text-lg w-full"
        style={{
          alignItems: "center",
        }}
      >
        <div className="flex flex-row justify-start gap-10">
          <div
            className="justify-start ml-5 my-1"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                style={{ width: "175px" }}
                className="bg-[#fef3ed]"
              />
            </Link>
          </div>
          <div className="flex flex-row font-medium gap-5 my-auto">
            <Link
              to="/"
              className="text-black  hover:underline hover:scale-110 py-1 transition-transform delay-50"
            >
              Home
            </Link>
            <Link
              to="/books"
              className="text-black hover:underline hover:scale-110 py-1 transition-transform delay-50"
            >
              Books
            </Link>
            <Link
              to="/aboutus"
              className="py-1 text-black hover:underline hover:scale-15 transition-transform delay-50"
            >
              About Us
            </Link>

            {location.pathname !== "/chat" ? (
              <Link
                to="/chat"
                className="text-white-0 text-base font-medium bg-cyan-0 px-2 align-middle my-auto py-1 rounded-lg hover:scale-105 duration-200"
              >
                OpenBook Community
              </Link>
            ) : null}
          </div>
        </div>
        {location.pathname !== "/" ? (
          <div className="flex items-center grow justify-end mr-10">
            <FaSearch
              onClick={() => setTrigger(true)}
              className="mr-3 text-xl cursor-pointer duration-200 hover:scale-105"
            />
          </div>
        ) : null}

        <div className="flex flex-row mr-4 gap-6">
          {isAuthenticated && user?.email !== adminEmail && (
            <div className="my-auto">
              <Link to="/cart">
                <AiOutlineShoppingCart className="text-3xl align-middle my-auto hover:scale-110 transition-transform delay-50" />
                {cartCounter > 0 && (
                  <div className="bg-red-500 text-xs rounded-full px-2 my-auto">
                    {cartCounter}
                  </div>
                )}
              </Link>
            </div>
          )}
          {isAuthenticated && user?.email === adminEmail && (
            <Link
              to="/create_book"
              className="text-white-0 hover:bg-[#D48620] bg-orange-0 align-middle my-auto rounded-lg text-sm font-medium hover:scale-105 transition-transform delay-50"
            >
              <div className="flex flex-row gap-1 p-1 align-middle mx-auto my-auto">
                <p className="my-auto px-2">Add Book</p>
                <IoMdAdd className="text-2xl " />
              </div>
            </Link>
          )}
          {isAuthenticated ? (
            <div className="end-2 my-auto align-middle">
              <SelectButton
                setSelectMenuOpen={setSelectMenuOpen}
                selectMenuOpen={selectMenuOpen}
                user={user}
              />{" "}
            </div>
          ) : (
            <div className="flex flex-row mr-8 gap-5">
              <LoginButton />
              <Link to="/Favourites">
                <button className="text-3xl align-middle text-black focus:outline-none hover:scale-110 transition-transform delay-100 ease-linear focus:shadow-outline rounded-full">
                  <MdFavoriteBorder />
                </button>
              </Link>
            </div>
          )}
          {/* Muestra el botón de inicio de sesión o cierre de sesión según el estado de autenticación del usuario */}
        </div>
      </nav>
      {trigger ? <Searchbar setTrigger={setTrigger} /> : null}
      <div className="absolute z-20 end-4 mr-2 mt-2">
        <Select selectMenuOpen={selectMenuOpen} />{" "}
      </div>
    </div>
  );
};

export default NavBar;
