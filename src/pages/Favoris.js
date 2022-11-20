import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

const Favoris = ({ token, connectedUser }) => {
  // const { userFavoris } = location.state;
  const [favorisUser, setfavorisUser] = useState();
  const [isLoadingFavoris, setIsLoadingFavoris] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvelback--56xblq4s6sr6.code.run/user/${connectedUser}`
        );
        // console.log(response.data);
        setfavorisUser(response.data);
        setIsLoadingFavoris(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [setfavorisUser, setIsLoadingFavoris, favorisUser, connectedUser]);

  const handleDeleteCharacterFavoris = async (id) => {
    try {
      const response = await axios.delete(
        `https://site--marvelback--56xblq4s6sr6.code.run/delete/character/favoris/`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          data: {
            user: connectedUser,
            favoris: id,
          },
        }
      );
      console.log(response.data);
      setIsLoadingFavoris(true);
      setfavorisUser(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComicFavoris = async (id) => {
    try {
      const response = await axios.delete(
        `https://site--marvelback--56xblq4s6sr6.code.run/delete/comic/favoris/`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          data: {
            user: connectedUser,
            favoris: id,
          },
        }
      );
      // console.log(response.data);
      setIsLoadingFavoris(true);
      setfavorisUser(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return isLoadingFavoris ? (
    <p>LOADING...</p>
  ) : (
    <div className="wrapper">
      <h1 style={{ textDecoration: "underline red", marginTop: "15px" }}>
        Bienvenue sur votre page des favoris
      </h1>
      <div className="favoris-main">
        <h2>Vos characters favoris :</h2>
        <div className="container-favoris">
          {favorisUser.characters.map((chara, ch) => {
            return (
              <div key={ch} className="photo-container">
                <Link to={`/comics/${chara._id}`}>
                  <img
                    className="photo-favoris"
                    src={`${chara.thumbnail.path}.${chara.thumbnail.extension}`}
                    alt={chara.name}
                  />
                </Link>
                <Button
                  variant="danger"
                  onClick={() => {
                    handleDeleteCharacterFavoris(chara._id);
                  }}
                >
                  Supprimer des favoris
                </Button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="favoris-main">
        <h2>Vos comics favoris :</h2>
        <div className="container-favoris">
          {favorisUser.comics.map((comic, c) => {
            return (
              <div key={c} className="photo-container">
                <Link to={`/comic/${comic._id}`}>
                  <img
                    className="photo-favoris"
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                  />
                </Link>
                <Button
                  variant="danger"
                  onClick={() => {
                    handleDeleteComicFavoris(comic._id);
                  }}
                >
                  Supprimer des favoris
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Favoris;
