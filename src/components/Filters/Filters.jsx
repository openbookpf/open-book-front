// Filter.js
import { useDispatch } from "react-redux";
import { getBooksFilterGenre } from "../../redux/actions";
import arrayGenres from "../../data/arrayGenres";

const Filter = () => {
  const dispatch = useDispatch();

  const handleGenreChange = (event) => {
    dispatch(getBooksFilterGenre(event.target.value));
  };

  return (
    <div className=" text-black">
      <h1 className="text-xl">Filter by:</h1>
      <div className="text-lg flex mt-3">
        <p>Genre:</p>
        <select onChange={handleGenreChange}>
          {arrayGenres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filter;
