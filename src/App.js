/* eslint-disable array-callback-return */
import RouterComponent from "./_router/RouterComponent";
import axios from "axios";
import { LisenseProvider } from "./_context/LisenseProvider";
import "../src/_assets/GlobalStyle.css";
import "./tailwind.css";
import React from "react";
import LisenseContext from "./_context/LisenseContext";

function Main() {
  const { setUser, setSeller, setCompany, user } = React.useContext(LisenseContext);
  React.useEffect(() => {
    userLogin();
    verifySeller();
  }, []);

  const userLogin = async () => {
    var verifyUser = localStorage.getItem("userId");
    if (verifyUser) {
      await axios
        .get(`https://dev.li-sense.xyz/api/v1/usuarios/${verifyUser}`, verifyUser)
        .then((res) => {
          setUser(res.data);
      
        });
    }
  };

  const verifySeller = async () => {
    var verifyUser = localStorage.getItem("userId");
    await axios
      .get(`https://dev.li-sense.xyz/api/v1/vendedor/${verifyUser}`)
      .then((res) => {
        if (res.data) {
          setSeller(true);
          setCompany(res.data)
        }
      })
      .catch((err) => {
      
        setSeller(false);
      });
  };
  return (
    <>
      <RouterComponent />
    </>
  );
}

function App() {
  return (
    <>
      <LisenseProvider>
        <Main />
      </LisenseProvider>
    </>
  );
}

export default App;
