import React, { useEffect, useState } from "react";
var querystring = require("querystring");
// eslint-disable-next-line import/first
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line import/first
import "./Login.css";
// eslint-disable-next-line import/first
import Logocentral from "../../_assets/img/logoredonda.png";
// eslint-disable-next-line import/first
import LisenseContext from "../../_context/LisenseContext";

// eslint-disable-next-line import/first
import { FaLock } from "react-icons/fa";

// eslint-disable-next-line import/first
import { HiOutlineMail } from "react-icons/hi";

// eslint-disable-next-line import/first

// eslint-disable-next-line import/first
import { gapi } from "gapi-script";

// eslint-disable-next-line import/first
import { clientId } from "../../_auth/LoginGoogle";

// eslint-disable-next-line import/first
import axios from "axios";

// eslint-disable-next-line import/first


export default function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState({ email: "", password: "" });
  const { setUser, user } = React.useContext(LisenseContext);
  const [isErr, setIsErr] = useState(false);
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const onSuccess = (res) => {
    console.log("LOGIN SUCCESS", res);
    setUser(res);
    if (res) {
      navigate("/profile");
    }
  };

  const onFailure = (res) => {
    console.log("LOGIN FAIL", res);
  };

  const userLogin = async () => {
    axios
      .post(
        "https://dev.li-sense.xyz/api/v1/usuarios/login",
        querystring.stringify({
          username: userData.email, //gave the values directly for testing
          password: userData.password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then(function (response) {
        localStorage.setItem("token", `Bearer ${response.data.access_token}`);
        axios.get("https://dev.li-sense.xyz/api/v1/usuarios/").then((res) => {
          res.data.map((email) => {
            if (email.email == userData.email) {
              localStorage.setItem('userId', email.id)
              setUser(email);
              navigate('/')
            }
          });

          //navigate("/");
        });
      })
      .catch((_err) => {
        setIsErr(true);
      });
  };
  return (
    <div className="container-geral">
      <div className="containerTexto">
        <div className="textoLogin">
          <img className="img1" src={Logocentral} />
          <h2>Seja Bem-vindo!</h2>
          <span>"Oportunidades não surgem. É você que as cria." </span>
          <span>LI-SENSE onde você é importante.</span>
        </div>
      </div>
      <div className="telalogin">
        <div className="containerLogin">
          <h1>Login</h1>
          <div>
            <div className="mb-login">
              <span className="span-input">E-mail</span>
              <div className="container-input">
                <input
                  type="email"
                  className="form-control"
                  placeholder="mail@mail.com"
                  onChange={(event) => {
                    setUserData({
                      email: event.target.value,
                      password: userData.password,
                    });
                  }}
                />
                <HiOutlineMail size={24} className="icon" />
              </div>
            </div>
            <div className="mb-login">
              <span className="span-input">Password</span>
              <div className="container-input">
                <input
                  type="password"
                  className="form-control"
                  placeholder="**********"
                  onChange={(event) => {
                    setUserData({
                      email: userData.email,
                      password: event.target.value,
                    });
                  }}
                />
                <FaLock size={20} className="icon" />
              </div>
            </div>
            <p
              className="esq"
              onClick={() => {
                navigate("/recovery");
              }}
            >
              Esqueceu a senha?
            </p>
            <p>{isErr && "Usuario ou senha incorreto."}</p>
            <button
              className="btn"
              onClick={() => {
                userLogin();
              }}
            >
              {" "}
              Entrar
            </button>
          </div>
          <p className="cadastrar">
            <a
              onClick={() => {
                navigate("/register");
              }}
            >
              Criar uma conta
            </a>
          </p>
          <p className="entarg">
            <a>Ou</a>
          </p>
          
        </div>
      </div>
    </div>
  );
}
