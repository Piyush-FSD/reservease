import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Header } from './components/Header';
import { Homepage } from './components/Homepage';
import { AdminRegister } from './components/Registration/AdminRegister';
import { UserRegister } from './components/Registration/UserRegister';
import { UserLogin } from './components/Login/UserLogin';
import { CartBar } from './components/CartBar';
import { AdminMenu } from './components/Admin/AdminMenu';
import { UserMenu } from './components/UserMenu'

import { SupremeTaco } from './SupremeTaco';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [userLogin, setUserLogin] = useState({
    email: "", password: ""
  });

  // state which will hold user's first name to display on homepage upon login
  const [userLoginData, setUserLoginData] = useState();

  // toggle show/hide sidebar
  const [showCart, setShowCart] = useState(false);
  // track onClick in [showCart] based on true/false toggle
  useEffect(() => { }, [showCart]);

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("userLoggedIn");

    if (isUserLoggedIn) {
      setUserLoginData(JSON.parse(isUserLoggedIn))
    }

    const testtt = async () => {
      const response = await fetch("/test")
      const data = await response.json();

      // console.log(data)
    }
    testtt()
  }, []);

  return (

    <BrowserRouter>
      <ToastContainer />
      <Header
        userLogin={userLogin}
        userLoginData={userLoginData}
        setUserLoginData={setUserLoginData}
        showCart={showCart}
        setShowCart={setShowCart}
      />
      {showCart && <CartBar
        userLoginData={userLoginData}
      />}
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
        {/* <Route exact path="/admin/menu">
          <AdminMenu />
        </Route> */}
        <Route exact path="/admin/menu/:userId">
          {userLoginData !== undefined && userLoginData.admin === true && <AdminMenu />}
        </Route>
        <Route exact path="/user/menu/:userId">
          <UserMenu />
        </Route>
        <Route exact path="/supreme-taco">
          <SupremeTaco />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

