import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = ({
  token,
  setToken,
  setConectedUser,
  setavatarUser,
  avatarUser,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorSignIn, setErrorSignIn] = useState("");
  const [profilPic, setProfilPic] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("email", email);
      formData.append("username", username);
      formData.append("password", password);
      if (profilPic) {
        formData.append("picture", profilPic);
      }
      const resToken = await axios.post(
        "http://localhost:3100/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(resToken.data);
      if (resToken.data.token) {
        setToken(resToken.data.token);
        setConectedUser(resToken.data.id);
        setavatarUser(resToken.data.account?.avatar?.secure_url);
        Cookies.set("token", token, { expires: 2 });
        Cookies.set("avatar", resToken.data.account?.avatar?.secure_url, {
          expires: 2,
        });
        navigate("/");
        setErrorSignIn("");
      }
    } catch (error) {
      console.log(error.message);
      console.log(error.response.status);
      console.log(error.response.data);
      if (error.response.status === 400)
        setErrorSignIn("Veuillez remplire tous les champs");
      if (error.response.status === 409)
        setErrorSignIn("Cet adresse mail existe déjà");
    }
  };

  return (
    <div className="wrapper container-form ">
      <div className="form">
        <h2 style={{ textAlign: "center" }}>S'inscrire</h2>

        <div>
          <Form action="submit" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                style={{ color: "white", backgroundColor: "black" }}
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Ajouter une photo de profile</Form.Label>
              <Form.Control
                style={{ color: "white", backgroundColor: "black" }}
                type="file"
                onChange={(e) => {
                  setProfilPic(e.target.files[0]);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                style={{ color: "white", backgroundColor: "black" }}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                style={{ color: "white", backgroundColor: "black" }}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>

            <Button
              variant="primary w-100"
              style={{ color: "white" }}
              type="submit"
            >
              S'inscrire
            </Button>
            <Link to="/login">Tu as deja un compte? connecte-toi!</Link>
            <p style={{ color: "red" }}>{errorSignIn}</p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
