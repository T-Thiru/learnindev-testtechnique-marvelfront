import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import CardComics from "../components/CardComics";
import Form from "react-bootstrap/Form";

const Comics = ({ setDataComics, dataComics }) => {
  const [isLoadingComics, setIsLoadingComics] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchComics, setsearchComics] = useState("");
  const [range, setrange] = useState(100);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvelback--56xblq4s6sr6.code.run/comics?title=${searchComics}&limit=${range}&skip=${
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
                setVisible(false);
              }}
            />
          </div>
          <div style={{ display: visible ? "none" : "" }}>
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
                      setVisible(true);
                    }}
                  >
                    {sujestedTitle.title}
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
            <ButtonGroup>
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
            {dataComics.results.sort().map((comic, index) => {
              return <CardComics key={index} comic={comic} />;
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Comics;
