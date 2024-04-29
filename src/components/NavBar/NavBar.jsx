import React from "react";
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

const NavBar = () => {
  const [trigger, setTrigger] = React.useState(false);

  const cartCounter = useSelector((state) => state.totalItems || 0);
  const location = useLocation();
  const { isAuthenticated, user } = useAuth0(); // Obtiene el estado de autenticación del usuario
  const adminEmail = "openbooklibrary.dev@gmail.com";
  return (
    <div>
      <nav
        className="z-20 flex flex-row fixed shadow-md bg-[#fef3ed] dark:bg-gray-600 justify-between font-semibold text-lg w-full"
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
                className="bg-[#fef3ed] dark:bg-slate-600"
              />
            </Link>
          </div>
          <div className="flex flex-row font-medium gap-5 my-auto">
            <Link
              to="/"
              className="text-black dark:text-white-0 hover:underline hover:scale-110 py-1 transition-transform delay-50"
            >
              Home
            </Link>
            <Link
              to="/books"
              className="text-black dark:text-white-0 hover:underline hover:scale-110 py-1 transition-transform delay-50"
            >
              Books
            </Link>
            <Link
              to="/aboutus"
              className="py-1 text-black dark:text-white-0 hover:underline hover:scale-15 transition-transform delay-50"
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

        <div className="flex flex-row mr-6 gap-6">
          {/* Se agrega una validación para el administrador */}
          {isAuthenticated && user?.email === adminEmail && (
            <Link
              to="/create_book"
              className="text-white-0 hover:bg-[#D48620] bg-orange-0 align-middle my-auto rounded-lg text-sm font-medium hover:scale-105 transition-transform delay-50"
            >
              <div className="flex flex-row gap-1 p-1 align-middle mx-auto my-auto">
                <p className="my-auto px-2"> Add Book</p>
                <IoMdAdd className="text-2xl " />
              </div>
            </Link>
          )}
          {/* Resto del código */}
          {isAuthenticated ? (
            <div className="flex flex-row mr-8 gap-5">
              {" "}
              <LogoutButton />{" "}
              <Link
                to="/profile"
                className="text-black dark:text-white-0 hover:underline hover:scale-15 transition-transform delay-50"
              >
                Profile
              </Link>{" "}
            </div>
          ) : (
            <LoginButton />
          )}{" "}
          {/* Muestra el botón de inicio de sesión o cierre de sesión según el estado de autenticación del usuario */}
          <Link to="/Favourites">
            <button className="text-3xl align-middle text-black dark:text-white-0 focus:outline-none hover:scale-110 transition-transform delay-100 ease-linear focus:shadow-outline rounded-full">
              <MdFavoriteBorder />
            </button>
          </Link>
          <Link to="/cart" className="text-black relative dark:text-white-0">
            <AiOutlineShoppingCart className="text-3xl align-middle hover:scale-110 transition-transform delay-50" />
            {cartCounter > 0 && (
              <span className="bg-red-500 text-xs rounded-full px-2 py-1 -mt-3 -mr-3 absolute">
                {cartCounter}
              </span>
            )}
          </Link>
        </div>
      </nav>
      {trigger ? <Searchbar setTrigger={setTrigger} /> : null}
    </div>
  );
};

export default NavBar;
