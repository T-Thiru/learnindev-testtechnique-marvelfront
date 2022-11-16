import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardComics from "../components/CardComics";

const Comics = ({ setDataComics, dataComics }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingComics, setIsLoadingComics] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3100/comics`);

        setDataComics(response.data);
        setIsLoadingComics(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [setDataComics, setIsLoadingComics]);

  const pages = [];
  if (!isLoadingComics) {
    for (let i = 1; i <= Math.ceil(dataComics.count / 50); i++) {
      pages.push(i);
    }
  }
  const clickPage = (page) => {
    setCurrentPage(page);
  };

  return isLoadingComics ? (
    <p>LOADING...</p>
  ) : (
    <main>
      <section>
        <div>
          <div className="display-cards wrapper">
            {dataComics.results.map((comic, index) => {
              return <CardComics key={index} comic={comic} />;
            })}
          </div>
        </div>
      </section>
      <section>
        <div className="pagination wrapper">
          {pages.map((page, index) => {
            return (
              <Link key={index} style={{ color: "red" }}>
                <span
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
