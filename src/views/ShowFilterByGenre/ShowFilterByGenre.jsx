import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooksByGenre } from "../../redux/actions";
import { useParams } from "react-router";
import Card from "../../components/Card/Card";
import { Paginator } from "primereact/paginator";

const ShowFilterByGenre = () => {
  const dispatch = useDispatch();
  const { genre } = useParams();

  useEffect(() => {
    dispatch(getBooksByGenre(genre));
  }, [dispatch, genre]);

  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(9);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const filterGenreBooks = useSelector((state) => state.filterGenreBooks);
  const authors = Array.from(
    new Set(filterGenreBooks.map((book) => book.author))
  );

  const filteredBooks = selectedAuthor
    ? filterGenreBooks.filter((book) => book.author === selectedAuthor)
    : filterGenreBooks;

  const handleAuthorFilter = (author) => {
    setSelectedAuthor(author === selectedAuthor ? "" : author);
  };

  return (
    <div className="relative flex flex-col w-screen">
      <div
        className="absolut brightness-50 saturate-150 contrast-100 bg-cover bg-center w-screen h-screen fixed"
        style={{
          backgroundImage: `url(https://img.freepik.com/foto-gratis/abundante-coleccion-libros-antiguos-estantes-madera-generados-ia_188544-29660.jpg)`,
          opacity: 0.9,
        }}
      ></div>
      <div className="relative mt-20 flex flex-row w-screen">
        <div className="flex-col basis-1/4 bg-[#fef3ed] shadow-lg rounded-xl h-min pb-10 justify-between items-center ml-5 mt-5">
          <p className="text-xl font-bold mt-4 mx-5">Authors</p>
          <div className="flex-col mt-3 ml-10 leading-6">
            {authors.map((author) => (
              <button
                key={author}
                className={
                  selectedAuthor === author
                    ? "text-base text-cyan-0 hover:text-orange-0"
                    : "text-base hover:text-orange-0"
                }
                onClick={() => handleAuthorFilter(author)}
              >
                {author}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center mx-auto content-center w-5/6 ">
          <h1 className="bg-cyan-0 text-white-0 shadow-lg tracking-tight text-2xl px-4 py-1 mt-3 font-semibold rounded-2xl">
            {genre} Books
          </h1>
          <div className="flex flex-wrap justify-center mx-auto p-2 mt-5">
            {filteredBooks.slice(first, first + rows).map((book) => (
              <div key={book.ISBN}>
                <Card book={book} showFavoriteButton={true} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="relative flex items-center text-center justify-center my-4 py-2">
        <div className="text-lg text-white-0 font-semibold border-2 rounded-full h-12 flex items-center justify-center">
          <Paginator
            className="text-white-0"
            first={first}
            rows={rows}
            totalRecords={filteredBooks.length}
            onPageChange={onPageChange}
            rowsPerPageOptions={[9, 18, 27]}
            template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          />
        </div>
      </footer>
    </div>
  );
};

export default ShowFilterByGenre;
