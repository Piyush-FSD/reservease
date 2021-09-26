import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Header } from './components/Header'
import { Homepage } from './components/Homepage'
import { AdminRegister } from './components/Registration/AdminRegister'
import { UserRegister } from './components/Registration/UserRegister'
import { AdminLogin } from './components/Login/AdminLogin'
import { UserLogin } from './components/Login/UserLogin'
import { SearchResult } from './components/SearchResult';

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

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Header />
          <Homepage
            adminLoginData={adminLoginData}
            userLoginData={userLoginData}
          />
        </Route>
        <Route exact path="/register/admin">
          <Header />
          <AdminRegister />
        </Route>
        <Route exact path="/register/user">
          <Header />
          <UserRegister />
        </Route>
        <Route exact path="/login/admin">
          <Header />
          <AdminLogin
            setAdminLoginData={setAdminLoginData}
            adminLogin={adminLogin}
            setAdminLogin={setAdminLogin}
          />
        </Route>
        <Route exact path="/login/user">
          <Header />
          <UserLogin
            setUserLoginData={setUserLoginData}
            userLogin={userLogin}
            setUserLogin={setUserLogin}
          />
        </Route>
        <Route exact path="/searchresult">
          <Header />
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
