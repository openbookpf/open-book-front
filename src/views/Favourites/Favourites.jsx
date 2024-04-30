import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Paginator } from "primereact/paginator";
import { MdHeartBroken } from "react-icons/md";
import Card from "../../components/Card/Card";

const Favorites = () => {
    const favorites = useSelector((state) => state.favorites);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(8);

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    return favorites.length ? (
        <div>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto max-w-7xl py-28 px-5">
                {favorites.slice(first, first + rows).map((favorite) => (
                    <div key={favorite.ISBN} className="relative">
                        <Card book={favorite} favorites={favorites} showFavoriteButton={true} />
                    </div>
                ))}
            </div>
            <footer className="flex items-center justify-center my-4 py-2">
                <div className="text-lg text-black font-semibold border-2 rounded-full h-12 flex items-center justify-center">
                    {favorites.length < 8 ? null : (
                        <Paginator
                            first={first}
                            rows={rows}
                            totalRecords={favorites.length}
                            onPageChange={onPageChange}
                            rowsPerPageOptions={[9, 18, 27]}
                            template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                        />
                    )}
                </div>
            </footer>
        </div>
    ) : (
        <div className="mt-64 flex flex-col justify-center items-center">
            <p className="text-xl">You don't have favorite books yet</p>
            <MdHeartBroken className="text-orange-0 opacity-60" />
        </div>
    );
};

export default Favorites;
