import React from "react";
import { Link } from "react-router-dom";

const CardComics = ({ comic }) => {
  return (
    <Link
      to={`/comic/${comic._id}`}
      className="noUnderline "
      style={{ color: "white" }}
    >
      <div className="card-container">
        <div>
          <img
            className="chara-pic"
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            alt={comic.title}
          />
          <div className="chara-detail">
            <span>
              <h2>{comic.title}</h2>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default CardComics;
