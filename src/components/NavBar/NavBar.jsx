import React from 'react'
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
  <nav>
  <Link to='/'> Inicio </Link>
  <Link to='/libros'> Libros </Link>
  <Link to='/nosotros'> Sobre Nosotros </Link>
  </nav>
);
};

export default NavBar;