import React from "react";
import { Carousel } from "primereact/carousel";
import Card from "../../components/Card/Card";
import { useSelector, useDispatch } from "react-redux";
import { change_name, search_book_by_name } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Home = ({ books }) => {
    const newName = useSelector((state) => state.searchname);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function changehandler(event) {
        if (event.target.name === "searchBar") {
            dispatch(change_name(event.target.value));
        }
    }

    function busqueda() {
        dispatch(search_book_by_name(newName));
        navigate("/searchbook");
    }
    React.useEffect(() => {
        console.log(newName);
    }, [newName]);

    const bookTemplate = (book) => {
        return <Card book={book} key={book.ISBN} />;
    };
    return (
        <div className="relative ">
            <div>
                <div
                    className="absolute brightness-50 saturate-150 contrast-100 bg-cover bg-center flex justify-center items-center  mt-16"
                    style={{
                        backgroundImage: `url(https://img.freepik.com/foto-gratis/abundante-coleccion-libros-antiguos-estantes-madera-generados-ia_188544-29660.jpg)`,

                        opacity: 0.9,
                        width: "100%",
                        height: "100vh",
                    }}
                ></div>

                <div className="grid grid-cols-1 gap-4 place-content-center h-svh">
                    <h3
                        className="relative text-[#fef3ed] text-center font-medium "
                        style={{
                            textShadow: "2px 6px 4px rgba(0, 0, 0, 1.0)",
                        }}
                    >
                        Welcome to <strong>OpenBook</strong>, your definitive literary destination
                    </h3>
                    <div className="w-full flex content-center items-center justify-center">
                        <input
                            className="z-20 w-1/2 px-2 py-2 rounded-lg text-lg"
                            type="text"
                            name="searchBar"
                            id=""
                            placeholder="Search for a Book..."
                            onChange={changehandler}
                            value={newName}
                        />
                        <button className="ml-[-45px] z-30" onClick={busqueda}>
                            <FaSearch />
                        </button>
                    </div>
                </div>
            </div>

            <footer>
                <div className="relative">
                    <div className="mt-20 mb-2 ml-12 font-bold text-2xl pb-5">
                        <p className="underline decoration-4 underline-offset-8 decoration-cyan-0">Best sellers</p>
                    </div>

                    <div>
                        <Carousel
                            value={books}
                            numVisible={5}
                            numScroll={3}
                            itemTemplate={bookTemplate}
                            autoplayInterval={3000}
                        />
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
