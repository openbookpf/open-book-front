import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import Searchbar from "../Searchbar/Searchbar";
import { useLocation } from "react-router-dom";

import logo from "../../assets/TrasparentLightMoodLogo.png";

const NavBar = () => {
  const [trigger, setTrigger] = React.useState(false);

  const location = useLocation();
  console.log(location.pathname);

  return (
    <div>
      <nav
        className="z-20 flex flex-row fixed shadow-md bg-[#fef3ed] justify-between font-semibold text-lg w-full"
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
                style={{ width: "170px" }}
                className="bg-[#fef3ed]"
              />
            </Link>
          </div>
          <div className="flex flex-row gap-5 my-auto">
            <Link
              to="/"
              className="text-black hover:underline hover:scale-110 transition-transform delay-50"
            >
              Home
            </Link>
            <Link
              to="/books"
              className="text-black hover:underline hover:scale-110 transition-transform delay-50"
            >
              Books
            </Link>
            <Link
              to="/aboutus"
              className="text-black hover:underline hover:scale-15 transition-transform delay-50"
            >
              About Us
            </Link>
          </div>
        </div>
        {location.pathname !== "/" ? (
          <div className="flex items-center grow justify-end mr-10">
            <FaSearch
              onClick={() => setTrigger(true)}
              className="mr-3 text-xl cursor-pointer duration-200 hover:scale-105"
            />
            {/* <input
                            className="px-2 py-2 text-sm round rounded-xl"
                            type="text"
                            placeholder="Search a book"
                            onClick={() => setTrigger(true)}
                        /> */}
          </div>
        ) : null}

        <div className="flex flex-row mr-8 gap-8">
          <Link
            to="/create_book"
            className="text-white-0 hover:bg-[#D48620] bg-orange-0 align-middle my-auto rounded-lg text-sm font-medium hover:scale-105 transition-transform delay-50"
          >
            <div className="flex flex-row gap-1 p-1 align-middle mx-auto my-auto">
              <p className="my-auto px-2"> Add Book</p>
              <IoMdAdd className="text-2xl " />
            </div>
          </Link>
          <Link to="/log-in" className="text-black">
            <AiOutlineUser className="text-3xl  hover:scale-110 transition-transform delay-50" />
          </Link>
          <Link to="/buy" className="text-black">
            <AiOutlineShoppingCart className="text-3xl  hover:scale-110 transition-transform delay-50" />
          </Link>
        </div>
      </nav>
      {trigger ? <Searchbar setTrigger={setTrigger} /> : null}
    </div>
  );
};

export default NavBar;
