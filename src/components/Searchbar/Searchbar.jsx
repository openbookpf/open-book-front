import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { change_name, search_book_by_name } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";

import Card from "../Card/Card";

const Searchbar = ({ setTrigger }) => {
  const newname = useSelector((state) => state.searchname);
  const searchbooks = useSelector((state) => state.searchbook);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function changehandler(event) {
    if (event.target.name === "name") {
      dispatch(change_name(event.target.value));
    }
  }

  function busqueda() {
    dispatch(search_book_by_name(newname));
  }
  useEffect(() => {
    return () => {
      dispatch(change_name(""));
    };
  }, []);

  const handleShowAllResults = () => {
    setTrigger(false);
    navigate("/searchbook");
  };

  const handleEnterSearch = (event) => {
    if (event.key === "Enter") {
      busqueda();
    }
  };

  return (
    // <div className="z-30 container w-screen h-screen fixed bg-black bg-opacity-20 flex align-center justify-center ">
    <div className="z-30 w-screen h-screen fixed bg-black bg-opacity-30">
      <div className="container w-1/2 h-max flex flex-col border-black rounded-lg bg-[#fef3ed] bg-opacity-95 mx-auto mt-20 shadow-2xl">
        <div className="flex  items-center justify-center content-center px-4 py-2 mx-0 mt-2">
          <input
            className="px-2 py-2 w-1/2 rounded-xl mr-4 text-sm border-2"
            name="name"
            value={newname}
            onChange={changehandler}
            placeholder=""
            onKeyDown={handleEnterSearch}
          />
          <button onClick={() => busqueda()}>
            <FaSearch className="mr-3" />
          </button>
          <button onClick={() => setTrigger(false)}>
            <MdOutlineClose className="text-4xl" />
          </button>
        </div>
        <div className="w-full">
          <div
            className="flex justify-center"
            // style={{ height: "100%", width: "100%" }}
          >
            {searchbooks &&
              searchbooks.slice(0, 3).map((book, index) => {
                return (
                  <div
                    className="scale-90"
                    style={{ flexBasis: "fit-content", height: "fit-content" }}
                    key={index + 1}
                    onClick={() => {
                      navigate(`/detail/${book.ISBN}`);
                      setTrigger(false);
                    }}
                  >
                    <Card book={book} />
                  </div>
                );
              })}
          </div>
        </div>

        <div className="flex w-full items-center justify-center content-center">
          {searchbooks?.length ? (
            <button
              className=" text-lg mb-4 bg-cyan-0 px-3 py-1 rounded-xl duration-200 hover:scale-105"
              onClick={handleShowAllResults}
            >
              Show All Results
            </button>
          ) : (
            <div className="h-[250px] flex flex-col items-center content-center justify-center text-black">
              <p className="text-lg ">Try Searching a Book for a Book </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
