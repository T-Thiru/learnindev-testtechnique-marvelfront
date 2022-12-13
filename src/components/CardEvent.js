import React from "react";
import { Link } from "react-router-dom";

const CardEvent = ({ event }) => {
  return (
    <Link className="noUnderline " style={{ color: "white" }}>
      <div className="card-container">
        <div>
          <img
            className="chara-pic"
            src={`${event.thumbnail.path}.${event.thumbnail.extension}`}
            alt={event.title}
          />
          <div className="chara-detail">
            <span>
              <h4>{event.title}</h4>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardEvent;
