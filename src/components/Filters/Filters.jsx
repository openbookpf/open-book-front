import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getGenresAndAuthors,
  getBooksFilter,
  appliedFilter,
  filterBooksByLanguage,
} from "../../redux/actions";

import { IoIosArrowForward } from "react-icons/io";

const Filter = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getGenresAndAuthors());
    }, []);

    const [price, setPrice] = useState({
        min: "",
        max: "",
    });


  const [showMoresGenres, setShowMoreGenres] = useState(false);
  const [showMoresAuthors, setShowMoreAuthors] = useState(false);


    const genres = useSelector((state) => state.genres);
    const authors = useSelector((state) => state.authors);
    const appliedFilters = useSelector((state) => state.appliedFilters);

    const handleFilter = (event) => {
        const property = event.target.value;
        const value = event.target.innerHTML;


    dispatch(
      getBooksFilter({
        ...appliedFilters,
        [property]: [...appliedFilters[property], value],
      })
    );

    dispatch(
      appliedFilter({
        ...appliedFilters,
        [property]: [...appliedFilters[property], value],
      })
    );
  };


    const handleChangePrice = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        setPrice({ ...price, [property]: value });
    };

    const handleFilterByPrice = () => {
        dispatch(getBooksFilter({ ...appliedFilters, min: price.min, max: price.max }));
        dispatch(appliedFilter({ ...appliedFilters, min: price.min, max: price.max }));
        setPrice({
            min: "",
            max: "",
        });
    };


  const handleShowGenres = () => {
    setShowMoreGenres(!showMoresGenres);
  };

  const handleShowAuthors = () => {
    setShowMoreAuthors(!showMoresAuthors);
  };

  const handleLanguageChange = (e) => {
    const { value } = e.target;

    dispatch(filterBooksByLanguage(value));
  };

  return (
    <div className="h-min min-h-screen">
      <h2 className="text-xl font-bold mx-5 mt-5">Filters</h2>
      <div className="ml-10">
        <p className="text-lg mt-3">Genres</p>
        <div className="text-sm ml-10 w-40 flex flex-col items-start">
          {!showMoresGenres
            ? genres.slice(0, 15).map((gen) => (
                <button onClick={handleFilter} value={"genres"} key={gen}>
                  {gen}
                </button>
              ))
            : genres.map((gen) => (
                <button onClick={handleFilter} value={"genres"} key={gen}>
                  {gen}
                </button>
              ))}
          {!showMoresGenres ? (
            <button
              className="text-cyan-0 underline"
              onClick={handleShowGenres}
            >
              Show more...
            </button>
          ) : (
            <button
              className="text-cyan-0 underline"
              onClick={handleShowGenres}
            >
              Show less...
            </button>
          )}
        </div>
        <p className="text-lg mt-3">Authors</p>
        <div className="text-sm ml-10 w-40 flex flex-col items-start">
          {!showMoresAuthors
            ? authors.slice(0, 15).map((auth) => (
                <button onClick={handleFilter} value={"author"} key={auth}>
                  {auth}
                </button>
              ))
            : authors.map((auth) => (
                <button onClick={handleFilter} value={"author"} key={auth}>
                  {auth}
                </button>
              ))}
          {!showMoresAuthors ? (
            <button
              className="text-cyan-0 underline"
              onClick={handleShowAuthors}
            >
              Show more...
            </button>
          ) : (
            <button
              className="text-cyan-0 underline"
              onClick={handleShowAuthors}
            >
              Show less...
            </button>
          )}
        </div>
        <p className="text-lg mt-3">Languages</p>
        <div className="text-sm ml-10 w-40 flex flex-col items-start">
          <button
            onClick={handleLanguageChange}
            value={"Spanish"}
            key={"Spanish"}
          >
            Spanish
          </button>
          <button
            onClick={handleLanguageChange}
            value={"English"}
            key={"English"}
          >
            English
          </button>
        </div>

        <div className="text-lg mt-3">
          <p>Price</p>
          <div className="flex justify-center items-center">

            <div className="ml-10">
                <p className="text-lg mt-3">Genres</p>
                <div className="text-sm ml-10 w-40 flex flex-col items-start">
                    {!showMoresGenres
                        ? genres &&
                          genres.slice(0, 15).map((gen) => (
                              <button onClick={handleFilter} value={"genre"} key={gen}>
                                  {gen.name}
                              </button>
                          ))
                        : genres &&
                          genres.map((gen) => (
                              <button onClick={handleFilter} value={"genre"} key={gen}>
                                  {gen.name}
                              </button>
                          ))}
                    {!showMoresGenres ? (
                        <button className="text-cyan-0 underline" onClick={handleShowGenres}>
                            Show more...
                        </button>
                    ) : (
                        <button className="text-cyan-0 underline" onClick={handleShowGenres}>
                            Show less...
                        </button>
                    )}
                </div>
                <p className="text-lg mt-3">Authors</p>
                <div className="text-sm ml-10 w-40 flex flex-col items-start">
                    {!showMoresAuthors
                        ? authors &&
                          authors.slice(0, 15).map((auth) => (
                              <button onClick={handleFilter} value={"author"} key={auth}>
                                  {auth.name}
                              </button>
                          ))
                        : authors &&
                          authors.map((auth) => (
                              <button onClick={handleFilter} value={"author"} key={auth}>
                                  {auth.name}
                              </button>
                          ))}
                    {!showMoresAuthors ? (
                        <button className="text-cyan-0 underline" onClick={handleShowAuthors}>
                            Show more...
                        </button>
                    ) : (
                        <button className="text-cyan-0 underline" onClick={handleShowAuthors}>
                            Show less...
                        </button>
                    )}
                </div>
                <div className="text-lg mt-3 dark:text-gray-100">
                    <p>Price</p>
                    <div className="flex justify-center items-center">
                        <div className="ml-10">
                            <div className="flex">
                                <label htmlFor="min" className="w-10">
                                    Min:
                                </label>
                                <input
                                    type="number"
                                    name="min"
                                    value={price.min}
                                    className="border-2 rounded-xl border-gray-700 ml-2 w-16"
                                    onChange={handleChangePrice}
                                />
                            </div>
                            <div className="flex">
                                <label htmlFor="max" className="w-10">
                                    Max:
                                </label>
                                <input
                                    type="number"
                                    name="max"
                                    value={price.max}
                                    className="border-2 rounded-xl border-gray-700 ml-2 w-16"
                                    onChange={handleChangePrice}
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleFilterByPrice}
                            className="duration-200 hover:text-orange-0 p-2 flex items-center justify-center font-bold"
                        >
                            <IoIosArrowForward />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;
