import React, { useState, useEffect } from "react";
import { Paginator } from "primereact/paginator";
import { MdHeartBroken } from "react-icons/md";
import { useSelector } from "react-redux";
import CardFav from "../../components/Card/CardFav";
import { useAuth0 } from "@auth0/auth0-react";
import Card from "../../components/Card/Card";

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
  return newusuario.length > 0 ? (
    <div className="h-screen max-w-screen">
      <div
        className="brightness-50 saturate-150 contrast-100 bg-cover bg-center w-screen h-screen fixed"
        style={{
          backgroundImage: `url(https://img.freepik.com/foto-gratis/abundante-coleccion-libros-antiguos-estantes-madera-generados-ia_188544-29660.jpg)`,
          opacity: 0.9,
        }}
      ></div>
      <div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto max-w-7xl py-28 px-5">
          {newusuario.slice(first, first + rows).map((favorite) => (
            <div key={favorite.fav_id} className="relative">
              <CardFav
                book={favorite}
                newusuario={newusuario}
                showFavoriteButton={true}
              />
            </div>
          ))}
        </div>
        <footer className="flex items-center justify-center my-4 py-2">
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
