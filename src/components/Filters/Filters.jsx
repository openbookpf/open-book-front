import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getGenresAndAuthors, getBooksFilter, appliedFilter, filterBooksByLanguage } from "../../redux/actions";
import { IoMdClose } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const Filter = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getGenresAndAuthors());
    }, []);

    const [showMoresGenres, setShowMoreGenres] = useState(false);
    const [showMoresAuthors, setShowMoreAuthors] = useState(false);
    const [languages, setLanguages] = useState([]);

    const genres = useSelector((state) => state.genres);
    const authors = useSelector((state) => state.authors);

    const [filtersApplied, setFiltersApplied] = useState({
        authorArray: [],
        genreArray: [],
        minPrice: "",
        maxPrice: "",
    });

    const handleFilter = (event) => {
        const property = event.target.value;
        const value = event.target.innerHTML;

        if (property === "genre") {
            //? si ya existe
            if (filtersApplied.genreArray.includes(value)) {
                setFiltersApplied({
                    ...filtersApplied,
                    genreArray: [...filtersApplied.genreArray].filter((gen) => gen !== value),
                });
                return dispatch(
                    getBooksFilter({
                        ...filtersApplied,
                        genreArray: [...filtersApplied.genreArray].filter((gen) => gen !== value),
                    })
                );
            }
            //? si no existe
            setFiltersApplied({ ...filtersApplied, genreArray: [...filtersApplied.genreArray, value] });
            return dispatch(getBooksFilter({ ...filtersApplied, genreArray: [...filtersApplied.genreArray, value] }));
        }


        //!--


        if (property === "author") {
            //? si ya existe
            if (filtersApplied.authorArray.includes(value)) {
                setFiltersApplied({
                    ...filtersApplied,
                    authorArray: [...filtersApplied.authorArray].filter((auth) => auth !== value),
                });
                return dispatch(
                    getBooksFilter({
                        ...filtersApplied,
                        authorArray: [...filtersApplied.authorArray].filter((auth) => auth !== value),
                    })
                );
            }
            //? si no existe
            setFiltersApplied({ ...filtersApplied, authorArray: [...filtersApplied.authorArray, value] });
            return dispatch(getBooksFilter({ ...filtersApplied, authorArray: [...filtersApplied.authorArray, value] }));
        }
    };

    const handleChangePrice = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        if (property === "min") {
            setFiltersApplied({ ...filtersApplied, minPrice: value });
        }
        if (property === "max") {
            setFiltersApplied({ ...filtersApplied, maxPrice: value });
        }
    };

    const handleFilterByPrice = () => {
        dispatch(getBooksFilter(filtersApplied));
    };

    const handleClearPrice = () => {
        setFiltersApplied({ ...filtersApplied, minPrice: "", maxPrice: "" });


        dispatch(getBooksFilter({ ...filtersApplied, minPrice: "", maxPrice: "" }));
    };

    const handleShowGenres = () => {
        if (!showMoresGenres) {
            setShowMoreGenres(true);
        } else {
            setShowMoreGenres(false);
        }
    };


  const handleLanguageChange = (e) => {
    const { value } = e.target;

    dispatch(filterBooksByLanguage(value));
  };

 

    return (
        <div className="h-min min-h-screen">
            <div className="flex justify-between items-center ml-5 mt-5">
                <h2 className="text-xl font-bold ">Filters</h2>
                {filtersApplied.genreArray.length ||
                filtersApplied.authorArray.length ||
                filtersApplied.minPrice ||
                filtersApplied.maxPrice ? (
                    <button
                        onClick={handleClearFitler}
                        className="text-lg bg-cyan-0 px-2 rounded-full text-white-0 duration-200 hover:bg-opacity-80"
                    >
                        Clean filters
                    </button>
                ) : null}
            </div>
            <div className="ml-10">
                <p className="text-lg mt-3">Genres</p>
                <div className="text-sm ml-10 w-40 flex flex-col items-start">
                    {!showMoresGenres
                        ? genres &&
                          genres.slice(0, 15).map((gen) => (
                              <button
                                  onClick={handleFilter}
                                  value={"genre"}
                                  key={gen}
                                  className={filtersApplied.genreArray.includes(gen) ? "text-orange-0 font-bold" : null}
                              >
                                  {gen}
                              </button>
                          ))
                        : genres &&
                          genres.map((gen) => (
                              <button
                                  onClick={handleFilter}
                                  value={"genre"}
                                  key={gen}
                                  className={filtersApplied.genreArray.includes(gen) ? "text-orange-0 font-bold" : null}
                              >
                                  {gen}
                              </button>
                          ))}
                    {!showMoresGenres ? (
                        genres.length < 15 ? null : (
                            <button className="text-cyan-0 underline" onClick={handleShowGenres}>
                                Show more...
                            </button>
                        )
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
                              <button
                                  onClick={handleFilter}
                                  value={"author"}
                                  key={auth}
                                  className={
                                      filtersApplied.authorArray.includes(auth) ? "text-orange-0 font-bold" : null
                                  }
                              >
                                  {auth}
                              </button>
                          ))
                        : authors &&
                          authors.map((auth) => (
                              <button
                                  onClick={handleFilter}
                                  value={"author"}
                                  key={auth}
                                  className={
                                      filtersApplied.authorArray.includes(auth) ? "text-orange-0 font-bold" : null
                                  }
                              >
                                  {auth}
                              </button>
                          ))}
                    {!showMoresAuthors ? (
                        genres.length < 15 ? null : (
                            <button className="text-cyan-0 underline" onClick={handleShowAuthors}>
                                Show more...
                            </button>
                        )
                    ) : (
                        <button className="text-cyan-0 underline" onClick={handleShowAuthors}>
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
                            <div className="flex">
                                <label htmlFor="min" className="w-10">
                                    Min:
                                </label>
                                <input
                                    type="number"
                                    name="min"
                                    value={filtersApplied.minPrice}
                                    className={
                                        filtersApplied.minPrice
                                            ? "border-2 rounded-xl border-orange-0 ml-2 w-16"
                                            : "border-2 rounded-xl border-gray-700 ml-2 w-16"
                                    }
                                    onChange={handleChangePrice}
                                />
                            </div>
                            <div className="flex mt-2">
                                <label htmlFor="max" className="w-10">
                                    Max:
                                </label>
                                <input
                                    type="number"
                                    name="max"
                                    value={filtersApplied.maxPrice}
                                    className={
                                        filtersApplied.maxPrice
                                            ? "border-2 rounded-xl border-orange-0 ml-2 w-16"
                                            : "border-2 rounded-xl border-gray-700 ml-2 w-16"
                                    }
                                    onChange={handleChangePrice}
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                onClick={handleFilterByPrice}
                                className="duration-200 hover:text-orange-0 p-2 flex items-center justify-center font-bold"
                            >
                                <IoIosArrowForward />
                            </button>
                            <button
                                onClick={handleClearPrice}
                                className="duration-200 hover:text-orange-0 p-2 flex items-center justify-center font-bold"
                            >
                                <IoMdClose />
                            </button>
                        </div>
                    </div>
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
