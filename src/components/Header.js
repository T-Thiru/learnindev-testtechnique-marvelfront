import React from "react";
import logo from "../assets/Logo.svg";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";

import { Link } from "react-router-dom";

const Header = ({
  avatarUser,
  setToken,
  setavatarUser,
  setConectedUser,
  connectedUser,
}) => {
  return (
    <div className="header wrapper">
      <div className="auth">
        <div>
          <Link to="/">
            <img className="logo" src={logo} alt="" />
          </Link>
        </div>
        <div>
          {avatarUser || Cookies.get("avatar") ? (
            <img
              className="avatar"
              src={Cookies.get("avatar") || avatarUser}
              alt="avatar"
            />
          ) : (
            ""
          )}

          {!connectedUser ? (
            <Link to="/login">
              <Button variant="outline-secondary m-2">LogIn</Button>
            </Link>
          ) : (
            ""
          )}

          {Cookies.get("token") ? (
            <Button
              variant="danger"
              onClick={() => {
                Cookies.remove("token");
                Cookies.remove("avatar");
                setToken(null);
                setConectedUser(null);
                setavatarUser("");
              }}
            >
              LogOut
            </Button>
          ) : (
            <Link to="/signup">
              <Button variant="outline-secondary">SignUp</Button>
            </Link>
          )}
        </div>
      </div>

      <nav className="navBar">
        <Link to="/">
          <Button variant="outline-secondary">Personnages</Button>
        </Link>
        <Link to="/comics">
          <Button variant="outline-secondary">Comics</Button>
        </Link>
        <Link to="/events">
          <Button variant="outline-secondary">Events</Button>
        </Link>
        <Link to="/favoris">
          <Button variant="outline-secondary">Favoris</Button>
        </Link>
      </nav>
    </div>
  );
};

export default Header;
