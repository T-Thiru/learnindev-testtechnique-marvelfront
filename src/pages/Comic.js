import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";

const Comic = ({ token }) => {
  const navigate = useNavigate();
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

  const handleFavorisComic = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3100/comic/favoris/`,
        { id: id, comic: dataComic },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);
      navigate("/favoris", { state: { userFavoris: response.data } });
    } catch (error) {
      console.log(error.message);
    }
  };

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
        <p className="wrapper">{dataComic.description}</p>
        {Cookies.get("token") ? (
          <Button
            variant="secondary w-100 m-2"
            style={{ color: "white" }}
            type="submit"
            onClick={handleFavorisComic}
          >
            Ajouter à mes favoris
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Comic;
