import { useSelector, useDispatch } from "react-redux";
import Card from "../../components/Card/Card";
import { useEffect } from "react";
import { resetSearchedBooks, change_name } from "../../redux/actions";

const ShowSearchByName = () => {
  const searchbooks = useSelector((state) => state.searchbook);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(searchbooks);
    return () => {
      dispatch(change_name(""));
      dispatch(resetSearchedBooks());
    };
  }, []);
  return searchbooks?.length ? (
    <div className="mt-20 flex flex-col">
      <div className="flex flex-row justify-center mx-auto content-center">
        <div className="grid grid-cols-4 my-11 gap-6 mx-auto p-2">
          {searchbooks.map((book, index) => {
            return (
              <div key={index + 1}>
                <Card book={book} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <p>{"HELLO"}</p>
  );
};

export default ShowSearchByName;
