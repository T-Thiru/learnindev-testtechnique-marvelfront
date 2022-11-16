import React from "react";
import logo from "../assets/Logo.svg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

const Header = ({ searchValue, setSearchValue }) => {
  return (
    <div className="header wrapper">
      <div>
        <Link to="/">
          <img className="logo" src={logo} alt="" />
        </Link>
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
        <Form.Control
          size="lg bg-black"
          type="search"
          placeholder="Search..."
        />
      </nav>
    </div>
  );
};

export default Header;
