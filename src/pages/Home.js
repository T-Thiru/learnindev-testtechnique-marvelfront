import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const Home = ({ setIsLoading, isLoading, setData, data }) => {
  const [searchCharacters, setsearchCharacters] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [range, setrange] = useState(100);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvelback--56xblq4s6sr6.code.run/characters?name=${searchCharacters}&limit=${range}&skip=${
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
                setVisible(false);
              }}
            />
          </div>
          <div style={{ display: visible ? "none" : "" }}>
            {data.results
              .filter((sujestedName) => {
                return (
                  searchCharacters &&
                  sujestedName.name
                    .replace()
                    .toLowerCase()
                    .includes(searchCharacters.toLowerCase()) &&
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
                      setVisible(true);
                    }}
                  >
                    {sujestedName.name}
                  </div>
                );
              })}
          </div>
          <div className="inputRange">
            <Form.Select
              style={{
                backgroundColor: "black",
                color: "white",
                width: "250px",
              }}
              onChange={(e) => {
                // console.log(e.target);
                setrange(e.target.value);
              }}
            >
              <option>Nombre d'affichage</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="75">75</option>
              <option value="100">100</option>
            </Form.Select>
          </div>
          <div className="pagination">
            <ButtonGroup aria-label="Basic example">
              <Button
                variant="secondary"
                disabled={currentPage === 1 ? true : false}
                onClick={() => {
                  setCurrentPage(1);
                }}
              >
                Premiere page
              </Button>
              <Button
                variant="secondary"
                disabled={currentPage <= 10 ? true : false}
                onClick={() => {
                  setCurrentPage(currentPage - 10);
                }}
              >
                -10
              </Button>

              <Button
                variant="secondary"
                disabled={currentPage === 1 ? true : false}
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                }}
              >
                precedent
              </Button>
              <Button
                variant="secondary"
                disabled={currentPage === pages.length - 1 ? true : false}
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                }}
              >
                suivant
              </Button>
              <Button
                variant="secondary"
                disabled={currentPage > pages.length - 11 ? true : false}
                onClick={() => {
                  setCurrentPage(currentPage + 10);
                }}
              >
                +10
              </Button>
              <Button
                variant="secondary"
                disabled={currentPage === pages.length - 1 ? true : false}
                onClick={() => {
                  setCurrentPage(pages.length - 1);
                }}
              >
                Derniere page
              </Button>
            </ButtonGroup>
          </div>
          <h6>
            Page :{currentPage} sur {pages.length - 1}
          </h6>
          <div className="display-cards">
            {data.results.sort().map((chara, index) => {
              return <Card key={index} chara={chara} />;
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
