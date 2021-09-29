import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Header } from './components/Header'
import { Homepage } from './components/Homepage'
import { AdminRegister } from './components/Registration/AdminRegister'
import { UserRegister } from './components/Registration/UserRegister'
import { UserLogin } from './components/Login/UserLogin'
import { SearchResult } from './components/SearchResult';
import { CartBar } from './components/CartBar';
import { AdminMenu } from './components/Admin/AdminMenu';
import { SupremeTaco } from './SupremeTaco';

export const App = () => {
  const [userLogin, setUserLogin] = useState({
    email: "", password: ""
  });

  // state which will hold user's first name to display on homepage upon login
  const [userLoginData, setUserLoginData] = useState();

  // toggle show/hide sidebar
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    localStorage.getItem("userLoggedIn") ?
      setUserLoginData(JSON.parse(localStorage.getItem("userLoggedIn"))) : setUserLoginData('')
  }, []);

  // track onClick in [showCart] based on true/false toggle
  useEffect(() => { }, [showCart]);

  return (
<<<<<<< Updated upstream
    <BrowserRouter>
      <Header
        userLogin={userLogin}
        userLoginData={userLoginData}
        setUserLoginData={setUserLoginData}
        showCart={showCart}
        setShowCart={setShowCart}
      />
      {showCart && <CartBar />}
      <Switch>
        <Route exact path="/">
          <Homepage
            userLoginData={userLoginData}
            setUserLoginData={setUserLoginData}
          />
        </Route>
        <Route exact path="/register/admin">
          <AdminRegister />
        </Route>
        <Route exact path="/register/user">
          <UserRegister />
        </Route>
        <Route exact path="/login/user">
          <UserLogin
            userLoginData={userLoginData}
            setUserLoginData={setUserLoginData}
            userLogin={userLogin}
            setUserLogin={setUserLogin}
          // setUserLogin={setUserLogin}
          />
        </Route>
        <Route exact path="/admin/menu">
          <AdminMenu />
        </Route>
        <Route exact path="/search/result">
          <SearchResult />
        </Route>
        <Route exact path="/supreme-taco">
          <SupremeTaco />
        </Route>
      </Switch>
    </BrowserRouter>
=======
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <img src="./burger.png"></img>
      </header>
    </div>
>>>>>>> Stashed changes
  );
};

