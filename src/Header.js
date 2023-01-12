import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header__right text-white ">
        <h1 className="my-1">Your favourite tunes</h1>
        <h2 className="d-flex my-1">All <FaSun className="mx-2" color="yellow"/> and all <FaMoon className="mx-2" color="black"/></h2>
      </div>
    </div>
  )
}

export default Header