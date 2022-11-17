import React from "react";
import logo from "../assets/Logo.svg";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";

const Header = ({ searchValue, setSearchValue }) => {
  return (
    <div className="header wrapper">
      <div className="auth">
        <div>
          <Link to="/">
            <img className="logo" src={logo} alt="" />
          </Link>
        </div>
        <div>
          <Link to="/login">
            <Button variant="outline-secondary m-2">LogIn</Button>
          </Link>
          <Link to="/signup">
            <Button variant="outline-secondary">SignUp</Button>
          </Link>
        </div>
      </div>

      <nav className="navBar">
        <Link to="/">
          <Button variant="outline-secondary">Personnages</Button>
        </Link>
        <Link to="/comics">
          <Button variant="outline-secondary">Comics</Button>
        </Link>
        <Link to="/favoris">
          <Button variant="outline-secondary">Favoris</Button>
        </Link>
      </nav>
    </div>
  );
};

export default Header;
