import { useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import { useEffect } from "react";
const ShowSearchByName = () => {
  const searchbooks = useSelector((state) => state.searchbook);
  useEffect(() => {
    console.log(searchbooks);
  });
  return (
    <div>
      <div>
        {searchbooks.map((book, index) => {
          return (
            <div key={index}>
              <Card book={book} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowSearchByName;
