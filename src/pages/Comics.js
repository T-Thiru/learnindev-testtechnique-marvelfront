import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CardComics from "../components/CardComics";
import Form from "react-bootstrap/Form";

const Comics = ({ setDataComics, dataComics }) => {
  const navigate = useNavigate();
  const [isLoadingComics, setIsLoadingComics] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
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
        <div id="topPage">
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
          <div>
            {dataComics.results
              .filter((sujestedTitle) => {
                return (
                  searchComics &&
                  sujestedTitle.title
                    .toLowerCase()
                    .includes(searchComics.toLowerCase()) &&
                  sujestedTitle.title.toLowerCase() !==
                    searchComics.toLocaleLowerCase()
                );
              })
              .slice(0, 10)
              .map((sujestedTitle, s) => {
                return (
                  <div
                    key={s}
                    onClick={() => {
                      setsearchComics(sujestedTitle.title);
                    }}
                  >
                    {sujestedTitle.title}
                  </div>
                );
              })}
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
          <div></div>
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
              <span
                key={index}
                style={{
                  paddingTop: "5px",
                  color: "white",
                  backgroundColor: "red",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                }}
                onClick={() => {
                  clickPage(page);
                }}
                value={page}
              >
                {page}
              </span>
            );
          })}
          <span style={{ color: "red" }}>Pages</span>
        </div>
      </section>
    </main>
  );
};

export default Comics;
