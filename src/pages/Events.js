import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import CardEvent from "../components/CardEvent";

const Events = () => {
  const [dataEvents, setDataEvents] = useState();
  const [searchEvents, setsearchEvents] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [range, setrange] = useState(100);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3100/events`);
        console.log(response.data);
        setDataEvents(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [setDataEvents, setIsLoading, searchEvents, range, currentPage]);

  const pages = [];
  if (!isLoading) {
    for (let i = 0; i <= Math.ceil(dataEvents.count / range); i++) {
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
              value={searchEvents}
              onChange={(e) => {
                setsearchEvents(e.target.value);
                setVisible(false);
              }}
            />
          </div>
          {/* <div
            style={{
              position: "absolute",
              zIndex: "100",
              display: visible ? "none" : "",
            }}
          >
            {dataEvents.results
              .filter((sujestedName) => {
                return (
                  searchEvents &&
                  sujestedName.title
                    .replace()
                    .toLowerCase()
                    .includes(searchEvents.toLowerCase()) &&
                  sujestedName.title.toLowerCase() !==
                    searchEvents.toLocaleLowerCase()
                );
              })
              .slice(0, 10)
              .map((sujestedName, s) => {
                return (
                  <div
                    key={s}
                    onClick={() => {
                      setsearchEvents(sujestedName.title);
                      setVisible(true);
                    }}
                  >
                    {sujestedName.title}
                  </div> */}
          {/* );
              })} */}
          {/* </div> */}
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
              <option value={range}>Nombre d'affichage</option>
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
            {dataEvents.results.map((event, index) => {
              return <CardEvent key={index} event={event} />;
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Events;
