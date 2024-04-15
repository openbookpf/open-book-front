import React from "react";

const Home = () => {
  return (
    <>
      <div>
        <div className="mt-16 text-black"></div>
        <div className="justify-center bg-black items-center align-middle h-96 relative">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(https://img.freepik.com/foto-gratis/abundante-coleccion-libros-antiguos-estantes-madera-generados-ia_188544-29660.jpg)",
              backgroundSize: "contain",
              opacity: 0.5,
            }}
          ></div>
          <h3 className="z-30 mx-auto py-32 font-bold text-white-0 text-center relative">
            Welcome to OpenBook, your definitive literary destination
          </h3>
        </div>
      </div>
      <footer>
        <div>
          <h3>Envios a todo el país</h3>
        </div>
      </footer>
    </>
  );
};

export default Home;
