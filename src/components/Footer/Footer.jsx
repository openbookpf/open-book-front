import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation(); // Obtiene la ubicación actual

  // Si la ruta es "/chat", no renderiza nada
  if (location.pathname === "/chat") {
    return null;
  }
  return (
    <>
      <footer className="z-20 flex flex-col py-2 text-sm bottom-0 bg-white-1 w-full justify-center items-center">
        <p className="text-center font-light py-2">
          ©2024. Developed by OpenBook Team. All of the code is open source.
        </p>
        <a
          className="text-center font-medium hover:font-bold hover:scale-105 transition-all duration-300"
          href="https://github.com/openbookpf"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub repo.
        </a>
      </footer>
    </>
  );
};

export default Footer;
