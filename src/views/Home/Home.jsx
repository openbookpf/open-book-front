import React, { useEffect, useState } from "react";
import { Carousel } from "primereact/carousel";
import Card from "../../components/Card/Card";
import { useSelector, useDispatch } from "react-redux";
import { change_name, search_book_by_name } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import headerOpenBook from "../../assets/headerOpenBook.jpg";
import Footer from "../../components/Footer/Footer";
import TrasparentLightMoodLogoResponsive from "../../assets/TrasparentLightMoodLogoResponsive.png";
import { useAuth0 } from "@auth0/auth0-react";
const Home = ({ books }) => {
  const newName = useSelector((state) => state.searchname);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();

  const responsiveOptions = [
    {
      breakpoint: "650px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "980px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1340px",
      numVisible: 3,
      numScroll: 2,
    },
    {
      breakpoint: "1350px",
      numVisible: 4,
      numScroll: 2,
    },
    {
      breakpoint: "1360",
      numVisible: 5,
      numScroll: 2,
    },
  ];

  function changehandler(event) {
    if (event.target.name === "searchBar") {
      dispatch(change_name(event.target.value));
    }
  }

  function busqueda() {
    dispatch(search_book_by_name(newName));
    navigate("/searchbook");
  }

  const handleEnterSearch = (event) => {
    if (event.key === "Enter") {
      busqueda();
    }
  };

  React.useEffect(() => {
    console.log(newName);
  }, [newName]);

  const bookTemplate = (book) => {
    return <Card book={book} showFavoriteButton={true} key={book.ISBN} />;
  };
  return (
    <div className="relative max-w-screen">
      <div>
        <div
          className="absolute brightness-50 saturate-150 contrast-100 bg-cover bg-center flex justify-center items-center mt-0"
          style={{
            backgroundImage: `url(https://img.freepik.com/foto-gratis/abundante-coleccion-libros-antiguos-estantes-madera-generados-ia_188544-29660.jpg)`,
            opacity: 1,
            width: "100%",
            height: "600px",
          }}
        >
          {" "}
        </div>
        <div className="relative">
          <div className="grid grid-cols-1 place-content-center top-5 w-full h-svh">
            <h3
              className="relative text-[#fef3ed] mb-5 text-center font-semibold text-4xl mv:mx-4"
              style={{
                textShadow: "2px 6px 4px rgba(0, 0, 0, 1.0)",
              }}
            >
              Welcome to <strong>OpenBook</strong>, your definitive literary
              destination
            </h3>
            <div className="w-3/4 flex mx-auto content-center items-center justify-center">
              <input
                className="z-10 px-2 py-2 rounded-lg text-lg mv:w-4/5 md:w-3/4 lg:w-2/4 xl:w-1/2"
                type="text"
                name="searchBar"
                id=""
                placeholder="Search for a Book..."
                onChange={changehandler}
                value={newName}
                onKeyDown={handleEnterSearch}
              />
              <button className="ml-[-45px] z-10" onClick={busqueda}>
                <FaSearch />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative -mt-20 mb-10">
        <div className="-mt-2 mb-2 ml-12 font-bold text-2xl pb-5 ">
          <p className="underline decoration-4 underline-offset-8  decoration-cyan-0">
            Best sellers
          </p>
        </div>

        <div className="mr-3">
          <div className="mv:px-7 sm:px-3">
            <Carousel
              value={books}
              numVisible={5}
              numScroll={2}
              responsiveOptions={responsiveOptions}
              itemTemplate={bookTemplate}
              autoplayInterval={3000}
            />
          </div>
        </div>
      </div>
      <div className="bottom-0">
        <div
          className="relative bg-blue-1 brightness-100 saturate-100 contrast-100 bg-cover bg-center flex justify-center items-center mt-0 "
          style={{
            backgroundImage: `url(${headerOpenBook})`,
            opacity: 1,
            width: "100%",

            height: "500px",
          }}
        >
          <div className="static">
            <div className="w-full z-30 flex flex-col content-center items-center my-auto justify-center">
              <h3
                className="relative text-[#fef3ed] mt-2 text-xl text-center font-medium mv:mx-4"
                style={{
                  textShadow: "2px 6px 4px rgba(0, 0, 0, 1.0)",
                }}
              >
                Share moments, experiences and opinions with other users in
              </h3>
              <Link
                to="/chat"
                className=" px-10 py-4 relative text-[#fef3ed] text-center text-xl font-bold duration-200 hover:scale-105 bg-cyan-0 rounded-full mt-5"
              >
                OpenBook Community
              </Link>
              <Link
                className="hover:scale-110 transition-transform duration-200"
                onClick={() => loginWithRedirect()}
              >
                <p
                  className="relative text-[#fef3ed] text-center font-medium mt-5"
                  style={{
                    textShadow: "2px 6px 4px rgba(0, 0, 0, 1.0)",
                  }}
                >
                  Log in and try it now!
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
