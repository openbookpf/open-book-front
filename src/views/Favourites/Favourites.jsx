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
        <div className="h-screen max-w-screen">
            <div
                className="brightness-50 saturate-150 contrast-100 bg-cover bg-center w-screen h-screen fixed"
                style={{
                    backgroundImage: `url(https://img.freepik.com/foto-gratis/abundante-coleccion-libros-antiguos-estantes-madera-generados-ia_188544-29660.jpg)`,
                    opacity: 0.9,
                }}
            ></div>
            <div className="">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto max-w-7xl py-28 px-5">
                    {favorites.slice(first, first + rows).map((favorite) => (
                        <div key={favorite.ISBN} className="relative">
                            <Card book={favorite} favorites={favorites} showFavoriteButton={true} />
                        </div>
                    ))}
                </div>
                <footer className="flex items-center justify-center">
                    <div className="text-lg text-black font-semibold border-2 rounded-full h-12 flex items-center justify-center">
                        {favorites.length < 8 ? null : (
                            <Paginator
                                className="mb-10"
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
        </div>
    ) : (
        <div className="flex justify-center">
            <div
                className="brightness-50 saturate-150 contrast-100 bg-cover bg-center w-screen h-screen fixed -z-10 opacity-90"
                style={{
                    backgroundImage: `url(https://img.freepik.com/foto-gratis/abundante-coleccion-libros-antiguos-estantes-madera-generados-ia_188544-29660.jpg)`,
                }}
            ></div>
            <div className="mt-64 flex flex-col justify-center items-center bg-white-0 w-96 p-4 rounded-xl">
                <p className="text-xl">You don't have favorite books yet</p>
                <MdHeartBroken className="text-orange-0 opacity-60" />
            </div>
        </div>
    );
};

export default Favorites;
