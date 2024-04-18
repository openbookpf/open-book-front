import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Filter from "../../components/Filters/Filters";
import { useDispatch, useSelector } from "react-redux";
import arrayGenres from "../../data/arrayGenres";
import { Paginator } from "primereact/paginator";
import { IoMdClose } from "react-icons/io";

import {
    getBooks,
    getBooksFilterGenre,
    sortByTitle,
    sortByPrice,
    appliedFilter,
    getBooksFilter,
} from "../../redux/actions";

const BookList = () => {
    const books = useSelector((state) => state.filteredBooks);
    const appliedFilters = useSelector((state) => state.appliedFilters);
    const appliedFiltersMod = { ...appliedFilters, min: Number(appliedFilters.min), max: Number(appliedFilters.max) };
    let filters = Object.values(appliedFilters);

    const dispatch = useDispatch();

    const [selectedTitle, setSelectedTitle] = useState("");
    const [selectedPrice, setSelectedPrice] = useState("");

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(8);

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    useEffect(() => {
        dispatch(getBooks());
    }, []);

    useEffect(() => {
        if (selectedTitle !== "") {
            dispatch(sortByTitle(selectedTitle));
        }
    }, [dispatch, selectedTitle]);

    useEffect(() => {
        if (selectedPrice !== "") {
            dispatch(sortByPrice(selectedPrice));
        }
    }, [dispatch, selectedPrice]);

    const handleSortChange = (event) => {
        const [sortType, sortDirection] = event.target.value.split("-");

        if (sortType === "title") {
            setSelectedTitle(sortDirection);
        } else if (sortType === "price") {
            setSelectedPrice(sortDirection);
        } else {
            setSelectedTitle("");
            setSelectedPrice("");
        }
        if (sortType === "none") {
            dispatch;
        }
    };

    const handleCloseFilter = (filter) => {
        const filterToRemove = Object.keys(appliedFilters).find((key) => appliedFilters[key] === filter);
        dispatch(appliedFilter({ ...appliedFilters, [filterToRemove]: "" }));
        dispatch(getBooksFilter({ ...appliedFilters, [filterToRemove]: "" }));
    };

    return (
        <div className="mt-20 flex w-sreen px-10">
            <Filter className="w-1/6" />
            <div className="flex flex-col w-full ml-10">
                <div className="flex h-10 items-center justify-between">
                    <div className="flex items-center">
                        {filters.map((filt) =>
                            filt ? (
                                <div
                                    className="flex items-center text-sm  bg-orange-0 bg-opacity-30 h-10 mx-2 px-2 rounded-xl duration-200 hover:scale-105"
                                    key={filt}
                                >
                                    <p className="mr-2 text-lg">
                                        {!isNaN(filt) ? <>$</> : null}
                                        {filt}
                                    </p>
                                    <button
                                        onClick={() => handleCloseFilter(filt)}
                                        className="duration-200 hover:bg-orange-0 rounded-full w-5 h-5 flex justify-center items-center"
                                    >
                                        <IoMdClose />
                                    </button>
                                </div>
                            ) : (
                                <div></div>
                            )
                        )}
                    </div>
                    <div className="flex items-center justify-center bg-orange-0 bg-opacity-30 px-2 py-1 rounded-xl">
                        <div className="text-lg flex">
                            <p className="pr-2">Sort by:</p>
                            <select onChange={handleSortChange} className="rounded-xl">
                                <option value="">None</option>
                                <option value="title-asc">Title (A - Z)</option>
                                <option value="title-desc">Title (Z - A)</option>
                                <option value="price-min">Price (Low - High)</option>
                                <option value="price-max">Price (High - Low)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row justify-center mx-auto content-start grow">
                    {/* <div className="grid grid-cols-4 my-11 gap-6 mx-auto p-2 "> */}
                    <div className="flex flex-wrap content-start my-11 mx-auto p-2 ">
                        {books.slice(first, first + rows).map((book) => (
                            <Card book={book} key={book.ISBN} />
                        ))}
                    </div>
                </div>

                <footer>
                    <div className="text-sm">
                        <Paginator
                            first={first}
                            rows={rows}
                            totalRecords={books.length}
                            onPageChange={onPageChange}
                            rowsPerPageOptions={[10, 20, 30]}
                            template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                        />
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default BookList;
