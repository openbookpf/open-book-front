import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Paginator } from "primereact/paginator";

import Card from "../../components/Card/Card";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(8);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto max-w-7xl py-28 px-5">
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
      <footer className="flex items-center justify-center my-4 py-2">
        <div className="text-lg text-black font-semibold border-2 rounded-full h-12 flex items-center justify-center">
          <Paginator
            first={first}
            rows={rows}
            totalRecords={favorites.length}
            onPageChange={onPageChange}
            rowsPerPageOptions={[9, 18, 27]}
            template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          />
        </div>
      </footer>
    </div>
  );
};

export default Favorites;
