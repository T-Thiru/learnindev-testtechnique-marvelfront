import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";

const Character = ({ token }) => {
  const navigate = useNavigate();
  const [dataCharacter, setDataCharacter] = useState();
  const [isLoadingCharacter, setIsLoadingCharacter] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvelback--56xblq4s6sr6.code.run/comics/${id}`
        );
        // console.log(response.data);
        setDataCharacter(response.data);
        setIsLoadingCharacter(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [setDataCharacter, setIsLoadingCharacter, id]);

  const handleFavorisCharacter = async () => {
    try {
      const response = await axios.post(
        `https://site--marvelback--56xblq4s6sr6.code.run/character/favoris/`,
        { id: id, character: dataCharacter },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data);
      navigate("/favoris", { state: { userFavoris: response.data } });
    } catch (error) {
      console.log(error.message);
    }
  };

  return isLoadingCharacter ? (
    <p>LOADING...</p>
  ) : (
    <div className="background-page main-container">
      <div className="container-Character wrapper">
        <h1>{dataCharacter.name}</h1>
        <img
          className="character-pic"
          src={`${dataCharacter.thumbnail.path}.${dataCharacter.thumbnail.extension}`}
          alt={dataCharacter.name}
        />
        <p>{dataCharacter.description}</p>
        {Cookies.get("token") ? (
          <Button
            variant="secondary w-100 m-2"
            style={{ color: "white" }}
            type="submit"
            onClick={handleFavorisCharacter}
          >
            Ajouter à mes favoris
          </Button>
        ) : (
          ""
        )}
      </div>
      <h2 className="wrapper separation">Listes des Comics du Personnage</h2>

      <div className="carrousel wrapper">
        {dataCharacter.comics.map((comic, i) => {
          return (
            <Link key={i} to={`/comic/${comic._id}`}>
              <img
                className="comic-pic"
                src={`${comic.thumbnail?.path}.${comic.thumbnail?.extension}`}
                alt={comic.title}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Character;
