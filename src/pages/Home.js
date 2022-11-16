import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";

const Home = ({ setIsLoading, isLoading, searchValue, setData, data }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3100/characters`);

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [setData, setIsLoading]);

  const pages = [];
  if (!isLoading) {
    for (let i = 1; i <= Math.ceil(data.count / 50); i++) {
      pages.push(i);
    }
  }
  const clickPage = (page) => {
    setCurrentPage(page);
  };

  return isLoading ? (
    <p>LOADING...</p>
  ) : (
    <main>
      <section>
        <div>
          <div className="display-cards wrapper">
            {data.results.map((chara, index) => {
              return <Card key={index} chara={chara} />;
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

export default Home;
