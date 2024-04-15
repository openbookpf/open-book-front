import React from "react";
import { Carousel } from "primereact/carousel";
import Card from "../../components/Card/Card";

const Home = ({ books }) => {
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
            Welcome to <strong>OpenBook</strong>, your definitive literary
            destination
          </h3>
        </div>
      </div>

      <div className="relative">
        <div className="mt-20 mb-2 ml-12 font-bold text-2xl pb-5">
          <p className="underline decoration-4 underline-offset-8 decoration-cyan-0">
            Best sellers
          </p>
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
    </div>
  );
};

export default Home;
