import { Link } from "react-router-dom";

const NotBookFound = () => {
  return (
    <div className="flex flex-col items-center justify-center content-center px-0 py-0">
      <p className="text-blue-0 text-sm">
        No se han encontrado registros con el número <b>ISBN</b> especificado,
        por lo que deberá crear un nuevo registro en la base de datos
      </p>
      <Link to={"/create_book"}>
        <span className="text-sm/[19px] font-bold text-white-0 border border-orange-0 py-1 px-1 rounded bg-orange-0">
          ➕CREAR UN LIBRO
        </span>
      </Link>
    </div>
  );
};

export default NotBookFound;
