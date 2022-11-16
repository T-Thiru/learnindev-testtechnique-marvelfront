import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Comic = () => {
  const [dataComic, setDataComic] = useState();
  const [isLoadingComic, setIsLoadingComic] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3100/comic/${id}`);
        // console.log(response.data);
        setDataComic(response.data);
        setIsLoadingComic(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [setDataComic, setIsLoadingComic, id]);

  return isLoadingComic ? (
    <p>LOADING...</p>
  ) : (
    <div className="background-page main-container">
      <div className="container-Character">
        <h1>{dataComic.title}</h1>
        <img
          className="character-pic"
          src={`${dataComic.thumbnail.path}.${dataComic.thumbnail.extension}`}
          alt=""
        />
        <p>{dataComic.description}</p>
      </div>
    </div>
  );
};

export default Comic;
