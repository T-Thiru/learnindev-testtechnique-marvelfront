import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "./components/Header";
import Home from "./pages/Home";
import Comics from "./pages/Comics";
import Favoris from "./pages/Favoris";
import { useState } from "react";
import Character from "./pages/Character";
import Comic from "./pages/Comic";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
function App() {
  const [data, setData] = useState();
  const [dataComics, setDataComics] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [connectedUser, setConectedUser] = useState();
  const [avatarUser, setavatarUser] = useState();

  return (
    <Router>
      <header>
        <Header
          setToken={setToken}
          setavatarUser={setavatarUser}
          setConectedUser={setConectedUser}
          avatarUser={avatarUser}
        />
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
            />
          }
        />
        <Route
          path="/comics"
          element={
            <Comics setDataComics={setDataComics} dataComics={dataComics} />
          }
        />
        <Route
          path="/favoris"
          element={
            Cookies.get("token") ? (
              <Favoris connectedUser={connectedUser} token={token} />
            ) : (
              <SignUp
                token={token}
                setToken={setToken}
                setConectedUser={setConectedUser}
                setavatarUser={setavatarUser}
                connectedUser={connectedUser}
              />
            )
          }
        />
        <Route path="/comics/:id" element={<Character token={token} />} />
        <Route path="/comic/:id" element={<Comic token={token} />} />
        <Route
          path="/login"
          element={
            <LogIn
              token={token}
              setToken={setToken}
              setConectedUser={setConectedUser}
              setavatarUser={setavatarUser}
              avatarUser={avatarUser}
            />
          }
        />
        <Route
          path="signup"
          element={
            <SignUp
              token={token}
              setToken={setToken}
              setConectedUser={setConectedUser}
              setavatarUser={setavatarUser}
              avatarUser={avatarUser}
            />
          }
        />
      </Routes>
      <footer>
        <p>Made at le Reacteur by Thiru - 2022</p>
      </footer>
    </Router>
  );
}

export default App;
