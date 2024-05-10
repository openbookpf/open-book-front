import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import Searchbar from "../Searchbar/Searchbar";
import { useSelector } from "react-redux";
import logo from "../../assets/TrasparentLightMoodLogo.png";
import logoResponsive from "../../assets/TrasparentLightMoodLogoResponsive.png";
import LoginButton from "../Buttons/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import Select from "./Select";
import SelectButton from "../Buttons/SelectButton";
import AdminNavbar from "./AdminNavbar";
import PriceConverter from "../PriceConverter/PriceConverter";
import { IoChatbubblesSharp } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { set } from "react-hook-form";

const NavBar = () => {
  const [trigger, setTrigger] = React.useState(false);

  const [showLinks, setShowLinks] = useState(false);

  const [selectMenuOpen, setSelectMenuOpen] = useState(false); // Define selectMenuOpen y setSelectMenuOpen

  const cartCounter = useSelector((state) => state.totalItems || 0);
  const location = useLocation();
  const { isAuthenticated, user } = useAuth0(); // Obtiene el estado de autenticación del usuario
  const adminEmail = "admin";

  const handleShowLinks = () => {
    if (showLinks) {
      setShowLinks(false);
    } else setShowLinks(true);
  };

  return (
    <div>
      <nav
        className="z-30 flex flex-row fixed shadow-md bg-[#fef3ed] justify-between font-semibold text-lg w-full"
        style={{
          alignItems: "center",
        }}
      >
        {!isAuthenticated || user.user_type !== adminEmail ? (
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
                  className="bg-[#fef3ed] md:flex mv:hidden"
                />
              </Link>
              <Link to="/">
                <img
                  src={logoResponsive}
                  alt="Logo"
                  style={{ width: "76px" }}
                  className="bg-[#fef3ed] md:hidden mv:flex "
                />
              </Link>
            </div>
            {/* ----------------- USER LINKS ------------------- */}

            <div className="mv:flex sm:hidden mt-5 flex-col">
              <FiMenu onClick={handleShowLinks} className="text-2xl" />
              {showLinks ? (
                <div className="absolute top-20 left-20">
                  <div className="flex flex-col bg-white-1 p-3 rounded-xl shadow-xl">
                    <Link
                      to="/books"
                      className="py-1 px-2 rounded-lg "
                      onClick={handleShowLinks}
                    >
                      Books
                    </Link>
                    <Link
                      to="/aboutus"
                      className="py-1 px-2 rounded-lg "
                      onClick={handleShowLinks}
                    >
                      About Us
                    </Link>

                    {location.pathname !== "/chat" ? (
                      <Link
                        to="/chat"
                        onClick={handleShowLinks}
                        className="text-white-0 text-base font-medium bg-cyan-0 px-2 align-middle my-auto py-1 rounded-full "
                      >
                        OpenBook Community
                      </Link>
                    ) : null}

                    <button
                      onClick={() => setTrigger(true)}
                      className="mv:flex items-center sm:hidden mv:mt-2 mv:ml-1 mr-3 text-xl cursor-pointer"
                    >
                      <FaSearch className="mr-2" />
                      Search
                    </button>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mv:hidden sm:flex flex-row font-medium gap-3 my-auto">
              <Link
                to="/books"
                className="hover:bg-white-2 py-1 px-2 rounded-lg transition-colors delay-50"
              >
                Books
              </Link>
              <Link
                to="/aboutus"
                className="hover:bg-white-2 py-1 px-2 rounded-lg transition-colors delay-50"
              >
                About Us
              </Link>

              {location.pathname !== "/chat" ? (
                <Link
                  to="/chat"
                  className="mv:hidden lg:flex text-white-0 text-base font-medium bg-cyan-0 px-2 align-middle my-auto py-1 rounded-full hover:scale-105 duration-200"
                >
                  OpenBook Community
                </Link>
              ) : null}
              {location.pathname !== "/chat" ? (
                <Link
                  to="/chat"
                  className="mv:flex lg:hidden text-white-0 text-base font-medium bg-cyan-0 px-2 align-middle my-auto py-2 rounded-full hover:scale-105 duration-200"
                >
                  <IoChatbubblesSharp />
                </Link>
              ) : null}
            </div>
            <PriceConverter />
          </div>
        ) : (
          <AdminNavbar />
        )}
        {location.pathname !== "/" &&
        isAuthenticated &&
        user.user_type !== adminEmail ? (
          <div className="mv:hidden sm:flex items-center grow justify-end mv:mr-5 sm:mr-10">
            <FaSearch
              onClick={() => setTrigger(true)}
              className="mr-3 text-xl cursor-pointer duration-200 hover:scale-105"
            />
          </div>
        ) : null}

        <div className="flex flex-row mr-4 gap-6">
          {isAuthenticated && user?.user_type !== adminEmail && (
            <div className="my-auto">
              <Link to="/cart">
                <AiOutlineShoppingCart className="text-3xl align-middle my-auto hover:scale-110 transition-transform delay-50" />
                {cartCounter > 0 && (
                  <div className="absolute bottom-2 bg-red-500 text-xs rounded-full w-5 h-5 flex justify-center items-center my-auto">
                    {cartCounter}
                  </div>
                )}
              </Link>
            </div>
          )}

          {/* Muestra el botón de inicio de sesión o cierre de sesión según el estado de autenticación del usuario */}
          {isAuthenticated ? (
            <div className="end-2 my-auto align-middle">
              <SelectButton
                setSelectMenuOpen={setSelectMenuOpen}
                selectMenuOpen={selectMenuOpen}
                user={user}
              />{" "}
            </div>
          ) : (
            <div className="flex flex-row mv:mr-0 sm:mr-8 gap-5">
              <Link
                to="/cart"
                className="text-black relative align-middle my-auto "
              >
                <AiOutlineShoppingCart className="text-3xl hover:scale-110 transition-transform delay-50" />
                {cartCounter > 0 && (
                  <span className="bg-red-500 p-1 -mt-3 align-middle text-xs rounded-full absolute">
                    {cartCounter}
                  </span>
                )}
              </Link>
              <LoginButton />
              <Link to="/Favourites">
                <button className="text-3xl align-middle text-black focus:outline-none hover:scale-110 transition-transform delay-100 ease-linear focus:shadow-outline rounded-full">
                  <MdFavoriteBorder />
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>
      {trigger ? <Searchbar setTrigger={setTrigger} /> : null}
      <div className="fixed z-20 end-2 mt-2">
        <Select
          setSelectMenuOpen={setSelectMenuOpen}
          selectMenuOpen={selectMenuOpen}
        />{" "}
      </div>
    </div>
  );
};

export default NavBar;
