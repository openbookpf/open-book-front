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
                <div className="flex flex-row flex-wrap justify-center">
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
    ) : null;
};

export default ShowSearchByName;
