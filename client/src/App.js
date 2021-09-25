import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Header } from './components/Header'
import { Homepage } from './components/Homepage'
import { AdminRegister } from './components/Registration/AdminRegister'
import { UserRegister } from './components/Registration/UserRegister'
import { AdminLogin } from './components/Login/AdminLogin'
import { UserLogin } from './components/Login/UserLogin'


export const App = () => {

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

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Header />
          <Homepage />
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
          <AdminLogin />
        </Route>
        <Route exact path="/login/user">
          <Header />
          <UserLogin />
        </Route>

      </Switch>
    </BrowserRouter>

  );
}

