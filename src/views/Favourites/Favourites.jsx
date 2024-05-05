import React, { useState, useEffect } from "react";
import { Paginator } from "primereact/paginator";
import { useSelector } from "react-redux";
import CardFav from "../../components/Card/CardFav";
import { useAuth0 } from "@auth0/auth0-react";

const Favorites = (props) => {
  const { user } = useAuth0();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(8);
  const favoritos = useSelector((state) => state.favorites);
  const [newusuario, setNewusuario] = useState([]);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };
  useEffect(() => {
    fetch(`http://localhost:3001/users/findbyidAuth0/${user.sub}`)
      .then((res) => res.json())
      .then((data) => setNewusuario(data.favorites));
  }, [user]);
  console.log(newusuario);
  return (
    <div>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto max-w-7xl py-28 px-5">
        {newusuario.slice(first, first + rows).map((favorite) => (
          <div key={favorite.fav_id} className="relative">
            <CardFav book={favorite} user={user} showFavoriteButton={true} />
          </div>
        ))}
      </div>
      <footer className="flex items-center justify-center my-4 py-2">
        <div className="text-lg text-black font-semibold border-2 rounded-full h-12 flex items-center justify-center">
          <Paginator
            first={first}
            rows={rows}
            totalRecords={newusuario.length}
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
