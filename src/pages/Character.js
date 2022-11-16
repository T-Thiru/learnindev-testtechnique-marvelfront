import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Character = () => {
  const [dataCharacter, setDataCharacter] = useState();
  const [isLoadingCharacter, setIsLoadingCharacter] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3100/comics/${id}`);
        console.log(response.data);
        setDataCharacter(response.data);
        setIsLoadingCharacter(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [setDataCharacter, setIsLoadingCharacter, id]);

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
      </div>
      <h2 className="wrapper separation">Listes des Comics du Personnage</h2>
      <div className="carrousel wrapper">
        {dataCharacter.comics.map((comic, i) => {
          return (
            <img
              key={i}
              className="comic-pic"
              src={`${comic.thumbnail?.path}.${comic.thumbnail?.extension}`}
              alt={comic.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Character;
