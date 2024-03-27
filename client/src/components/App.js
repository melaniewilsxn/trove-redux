import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NavBar from "./NavBar";
import About from '../pages/About'
import Account from "../pages/Account";
import Discover from "../pages/Discover";
import Home from "../pages/Home";
import Library from "../pages/Library";
import Login from "../pages/Login";

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="App">
      <Header />
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/library">
          <Library />
        </Route>
        <Route exact path="/discover">
          <Discover />
        </Route>
        <Route exact path="/account">
          <Account />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
