import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Paginator } from "primereact/paginator";
import { MdHeartBroken } from "react-icons/md";
import Card from "../../components/Card/Card";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(6);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return favorites.length ? (
    <div className="h-screen max-w-screen">
      <div
        className="brightness-50 saturate-150 contrast-100 bg-cover bg-center w-screen h-screen fixed -z-10 opacity-90"
        style={{
          backgroundImage: `url(https://img.freepik.com/foto-gratis/abundante-coleccion-libros-antiguos-estantes-madera-generados-ia_188544-29660.jpg)`,
        }}
      ></div>
      <div className="flex h-full flex-col justify-between items-center">
        <div className="flex h-full flex-wrap justify-center mt-20 mb-5 w-3/5">
          {favorites.slice(first, first + rows).map((favorite) => (
            <div key={favorite.ISBN} className="relative">
              <Card
                book={favorite}
                favorites={favorites}
                showFavoriteButton={true}
              />
            </div>
          ))}
        </div>
        <footer className="flex items-center justify-center">
          <div className="text-lg text-black font-semibold rounded-full h-12 flex items-center justify-center">
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
    <div className="flex h-full justify-center">
      <div
        className="brightness-50 saturate-150 contrast-100 bg-cover bg-center w-screen h-full fixed -z-10 opacity-90"
        style={{
          backgroundImage: `url(https://img.freepik.com/foto-gratis/abundante-coleccion-libros-antiguos-estantes-madera-generados-ia_188544-29660.jpg)`,
        }}
      ></div>
      <div className="mt-60 mb-96 h-20 flex flex-col justify-center items-center bg-white-0 w-96 p-4 rounded-xl">
        <p className="text-xl">You don't have favorite books yet</p>
        <MdHeartBroken className="text-orange-0 opacity-60" />
      </div>
    </div>
  );
};

export default Favorites;
