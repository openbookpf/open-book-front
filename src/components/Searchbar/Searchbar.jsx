import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { change_name, search_book_by_name } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const newname = useSelector((state) => state.searchname);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function changehandler(event) {
    if (event.target.name === "name") {
      dispatch(change_name(event.target.value));
    }
  }

  function busqueda() {
    dispatch(search_book_by_name(newname));
    navigate("searchbook");
  }
  useEffect(() => {
    console.log(newname);
  }, [newname]);
  return (
    <div>
      <button onClick={() => busqueda()}>search</button>
      <input name="name" value={newname} onChange={changehandler} />
    </div>
  );
};

export default Searchbar;
