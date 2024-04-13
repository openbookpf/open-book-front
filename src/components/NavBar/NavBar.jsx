import React from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai';
import logo from '../../assets/TrasparentLightMoodLogo.png'

const NavBar = () => {
  return (
    <nav style={{ backgroundColor: '#F4F1DE', padding: '-10rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <Link to='/'>
        <img src={logo} alt="Logo" style={{ width: '150px', marginRight: '0.5rem' }} />
      </Link>
      </div>
      <div>
        <Link to='/' className="text-black font-poppins inline-block mr-[8rem]">Inicio</Link>
        <Link to='/libros' className="text-black font-poppins inline-block mr-[8rem]">Libros</Link>
        <Link to='/nosotros' className="text-black font-poppins inline-block mr-[8rem]">Sobre Nosotros</Link>
        <Link to='/iniciar-sesion' className="text-black font-poppins inline-block mr-[2rem]">
          <AiOutlineUser />
        </Link>
        <Link to='/carrito' className="text-black font-poppins inline-block">
          <AiOutlineShoppingCart />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;