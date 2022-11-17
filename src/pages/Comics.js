import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardComics from "../components/CardComics";
import Form from "react-bootstrap/Form";

const Comics = ({ setDataComics, dataComics }) => {
  const [isLoadingComics, setIsLoadingComics] = useState(true);
  const [currentPage, setCurrentPage] = useState(100);
  const [searchComics, setsearchComics] = useState("");
  const [range, setrange] = useState(100);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3100/comics?title=${searchComics}&limit=${range}&skip=${
            currentPage * range - range
          }`
        );

        setDataComics(response.data);
        setIsLoadingComics(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [setDataComics, setIsLoadingComics, searchComics, range, currentPage]);

  const pages = [];
  if (!isLoadingComics) {
    for (let i = 0; i <= Math.ceil(dataComics.count / range); i++) {
      pages.push(i + 1);
    }
  }
  const clickPage = (page) => {
    setCurrentPage(page);
  };

  return isLoadingComics ? (
    <p>LOADING...</p>
  ) : (
    <main>
      <section className="wrapper">
        <div>
          <div className="filter-bar">
            <Form.Control
              style={{ color: "white" }}
              size="lg bg-black"
              type="search"
              value={searchComics}
              placeholder="Search..."
              onChange={(e) => {
                setsearchComics(e.target.value);
              }}
            />
          </div>
          <div className="inputRange">
            <label htmlFor="range">Nombre de comics à afficher : {range}</label>
            <input
              id="range"
              type="range"
              min="1"
              max="100"
              defaultValue={range}
              onChange={(e) => {
                // console.log(e.target);
                setrange(e.target.value);
              }}
            />
          </div>
          <div className="display-cards">
            {dataComics.results.sort().map((comic, index) => {
              return <CardComics key={index} comic={comic} />;
            })}
          </div>
        </div>
      </section>
      <section>
        <div className="pagination wrapper">
          {pages.map((page, index) => {
            return (
              <Link
                key={index}
                style={{
                  textDecoration: "none",
                  width: "30px",
                  height: "30px",
                  backgroundColor: "red",
                  borderRadius: "50%",
                }}
              >
                <span
                  style={{
                    color: "white",
                    backgroundColor: "red",
                  }}
                  onClick={() => {
                    clickPage(page);
                  }}
                  value={page}
                >
                  {page}
                </span>
              </Link>
            );
          })}
          <span style={{ color: "red" }}>Pages</span>
        </div>
      </section>
    </main>
  );
};

export default Comics;
