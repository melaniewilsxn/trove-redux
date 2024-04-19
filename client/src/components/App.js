import React, { useEffect, useState } from "react";
import { GridColumn, GridRow, Grid, Segment, Image, Button, SegmentGroup, Container } from 'semantic-ui-react'
import { Route, Switch } from 'react-router-dom'
import NavBar from "./NavBar";
import Login from "../pages/Login";
import Discover from "../pages/Discover";
import Home from "../pages/Home";
import Library from "../pages/Library";

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

  const handleLogout = () => {
    fetch("/logout", {
      method: "DELETE",
    })
    .then((response) => {
      if (response.ok) {
        setUser(null); // Successfully logged out, clear user state
      }
    })
    .catch((error) => console.error("Logout failed:", error));
  };

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div style={{ padding: '10px', backgroundColor: "black", height: '100%'}}>
      <Grid >
        <GridColumn width={4} >
          <Segment inverted style={{ height: '100%' }}>
            <Image src="trove.png" size="small" />
            <NavBar />
          </Segment>
        </GridColumn>
        <GridColumn stretched width={12} >
          <SegmentGroup style={{ height: '100%' }}>
            <Segment textAlign="right" inverted>
              <Image src="profile.png" avatar />
              <span style={{ padding: '8px' }}>{user.first_name}</span>
              <Button onClick={handleLogout} >Logout</Button>
            </Segment>
            <Segment inverted >
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/discover">
                  <Discover />
                    </Route>
                <Route exact path="/library">
                    <Library />
                </Route>
              </Switch>
            </Segment>
          </SegmentGroup>
        </GridColumn>
      </Grid>
    </div>
  );
}

export default App;