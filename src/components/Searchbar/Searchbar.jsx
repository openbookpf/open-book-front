import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { change_name, search_book_by_name } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

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
    console.log(newname);
  }, [newname]);

  const handleShowAllResults = () => {
    setTrigger(false);
    navigate("/searchbook");
  };

  return (
    <div className="z-30 container w-full h-full fixed top-0 left-0 bg-black bg-opacity-20 flex align-center justify-center content-center border border-black ">
      <div className="container w-1/2 h-max border border-black rounded-lg bg-[#3D405B] mx-auto mt-20 ">
        <div className="flex items-center justify-center content-center px-4 py-2 mx-0 my-0">
          <input
            className="px-2 py-2 w-1/2 rounded-lg text-sm"
            name="name"
            value={newname}
            onChange={changehandler}
            placeholder=""
          />
          <button onClick={() => busqueda()}>🔍</button>
          <button onClick={() => setTrigger(false)}>X</button>
        </div>
        <div
          className="flex px-20 mt-[-55px]"
          style={{ height: "100%", width: "100%" }}
        >
          {searchbooks.slice(0, 3).map((book, index) => {
            return (
              <div
                className="scale-[60%]"
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
        <div className="flex w-full items-center justify-center content-center">
          <button
            className="border border-orange-0 text-lg font-bold mb-2 bg-orange-0 px-1 py-1 rounded-lg te) {
              
            }"
            onClick={handleShowAllResults}
          >
            SHOW ALL RESULTS
          </button>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
