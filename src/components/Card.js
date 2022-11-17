import React from "react";
import { Link } from "react-router-dom";

const Card = ({ chara }) => {
  return (
    <Link
      to={`/comics/${chara._id}`}
      className="noUnderline "
      style={{ color: "white" }}
    >
      <div className="card-container">
        <div>
          <img
            className="chara-pic"
            src={`${chara.thumbnail.path}.${chara.thumbnail.extension}`}
            alt={chara.name}
          />
          <div className="chara-detail">
            <span>
              <h4>{chara.name}</h4>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
