import React, { useEffect, useState } from "react";
import { GridColumn, Grid, Segment, Image, Button, SegmentGroup } from 'semantic-ui-react'
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
    <Segment>
      <Grid>
        <GridColumn width={4}>
          <Image src="trove.png" size="small" />
          <NavBar />
        </GridColumn>
        <GridColumn stretched width={12}>
          <SegmentGroup>
            <Segment textAlign="right">
              {/* <Grid>
                <Grid.Row columns="equal" verticalAlign="middle">
                  <GridColumn>
                    <Image src={user.image_url} avatar />
                  </GridColumn>
                  <GridColumn>
                    <span>{user.first_name}</span>
                  </GridColumn>
                  <GridColumn>
                    <Button onClick={handleLogout} style={{ backgroundColor: '#5E793C', color: 'white' }}>Logout</Button>
                  </GridColumn>
                </Grid.Row>
              </Grid> */}
              <Image src={user.image_url} avatar style={{ paddingRight: '10px' }}/>
              <span style={{ paddingRight: '10px' }}>{user.first_name}</span>
              <Button onClick={handleLogout} style={{ color: '#5E793C' }}>Logout</Button>
            </Segment>
            <Segment>
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
    </Segment>
  );
}

export default App;