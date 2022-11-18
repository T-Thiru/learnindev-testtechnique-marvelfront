import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

const Home = ({ setIsLoading, isLoading, setData, data }) => {
  const [searchCharacters, setsearchCharacters] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [range, setrange] = useState(100);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3100/characters?name=${searchCharacters}&limit=${range}&skip=${
            currentPage * range - range
          }`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [setData, setIsLoading, searchCharacters, range, currentPage]);

  const pages = [];
  if (!isLoading) {
    for (let i = 0; i <= Math.ceil(data.count / range); i++) {
      pages.push(i + 1);
    }
  }
  const clickPage = (page) => {
    setCurrentPage(page);
  };

  return isLoading ? (
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
              placeholder="Search..."
              value={searchCharacters}
              onChange={(e) => {
                setsearchCharacters(e.target.value);
              }}
            />
          </div>
          <div>
            {data.results
              .filter((sujestedName) => {
                return (
                  searchCharacters &&
                  sujestedName.name
                    .toLowerCase()
                    .startsWith(searchCharacters.toLowerCase(0, 10)) &&
                  sujestedName.name.toLowerCase() !==
                    searchCharacters.toLocaleLowerCase()
                );
              })
              .slice(0, 10)
              .map((sujestedName, s) => {
                return (
                  <div
                    key={s}
                    onClick={() => {
                      setsearchCharacters(sujestedName.name);
                    }}
                  >
                    {sujestedName.name}
                  </div>
                );
              })}
          </div>
          <div className="inputRange">
            <label htmlFor="range">
              Nombre de personages à afficher : {range}
            </label>
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
            {data.results.sort().map((chara, index) => {
              return <Card key={index} chara={chara} />;
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
                    textDecoration: "none",
                    textAlign: "center",
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

export default Home;
