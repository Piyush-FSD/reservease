import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Header } from './components/Header'
import { Homepage } from './components/Homepage'
import { AdminRegister } from './components/Registration/AdminRegister'
import { UserRegister } from './components/Registration/UserRegister'
import { AdminLogin } from './components/Login/AdminLogin'
import { UserLogin } from './components/Login/UserLogin'
import { SearchResult } from './components/SearchResult';
import { CartBar } from './components/CartBar';

export const App = () => {
  // admin login
  const [adminLogin, setAdminLogin] = useState({
    email: "",
    password: ""
  });

  // state which will hold business name to display on homepage upon login
  const [adminLoginData, setAdminLoginData] = useState();

  // user login
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: ""
  });

  // state which will hold user's first name to display on homepage upon login
  const [userLoginData, setUserLoginData] = useState();

  // toggle show/hide sidebar
  const [showCart, setShowCart] = useState(false);

  // track onClick in [showCart] based on true/false toggle
  useEffect(() => { }, [showCart])

  return (
    <BrowserRouter>
      <Header
        showCart={showCart}
        setShowCart={setShowCart}
      />
      {showCart && <CartBar />}
      <Switch>
        <Route exact path="/">
          <Homepage
            adminLoginData={adminLoginData}
            setAdminLoginData={setAdminLoginData}
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
        <Route exact path="/login/admin">
          <AdminLogin
            setAdminLoginData={setAdminLoginData}
            adminLogin={adminLogin}
            setAdminLogin={setAdminLogin}
          />
        </Route>
        <Route exact path="/login/user">
          <UserLogin
            setUserLoginData={setUserLoginData}
            userLogin={userLogin}
            setUserLogin={setUserLogin}
          />
        </Route>
        <Route exact path="/searchresult">
          <SearchResult />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

// useEffect(() => {
//   const testAsync = async () => {
//     try {
//       const response = await fetch('/hello')
//       console.log(response)
//       const data = await response.json()
//     } catch (error) {
//     }
//   }
//   testAsync();
// }, [])
