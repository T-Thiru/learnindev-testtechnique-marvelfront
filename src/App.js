import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Comics from "./pages/Comics";
import Favoris from "./pages/Favoris";
import { useState } from "react";
import Character from "./pages/Character";
import Comic from "./pages/Comic";
function App() {
  const [data, setData] = useState();
  const [dataComics, setDataComics] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // const [token, setToken] = useState(Cookies.get("token") || null);

  const [searchValue, setSearchValue] = useState("");

  return (
    <Router>
      <header>
        <Header setSearchValue={setSearchValue} />
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setData={setData}
              data={data}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              searchValue={searchValue}
            />
          }
        />
        <Route
          path="/comics"
          element={
            <Comics setDataComics={setDataComics} dataComics={dataComics} />
          }
        />
        <Route path="/favoris" element={<Favoris />} />
        <Route path="/comics/:id" element={<Character />} />
        <Route path="/comic/:id" element={<Comic />} />
      </Routes>
      <footer>
        <p>Made at le Reacteur by Thiru - 2022</p>
      </footer>
    </Router>
  );
}

export default App;
