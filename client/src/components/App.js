import React, { useEffect, useState } from "react";
import { GridColumn, Grid, Segment, Image, Button, SegmentGroup } from 'semantic-ui-react';
import { Routes, Route } from 'react-router-dom';
import NavBar from "./NavBar";
import Login from "../pages/Login";
import Discover from "../pages/Discover";
import Home from "../pages/Home";
import Libraries from "../pages/Libraries";
import DiscoverGenre from "../pages/DiscoverGenre";
import Book from "../pages/Book";
import Library from "../pages/Library";
import About from "../pages/About";
import Books from "../pages/Books";

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
    <div style={{ padding: '10px'}}>
      <Grid >
        <GridColumn width={4} >
          <Segment inverted style={{ height: '100%' }}>
            <Image src="http://localhost:3000/trove.png" size="large" />
            <NavBar />
          </Segment>
        </GridColumn>
        <GridColumn stretched width={12} >
          <SegmentGroup style={{ height: '100%' }}>
            <Segment textAlign="right" inverted>
              <Image src="http://localhost:3000/profile.png" avatar />
              <span style={{ padding: '8px' }}>{user.first_name}</span>
              <Button onClick={handleLogout} >Logout</Button>
            </Segment>
            <Segment inverted >
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/books" element={<Books />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/library" element={<Libraries />} />
              <Route path="/about" element={<About />} />
              <Route path="/discover/:genreName" element={<DiscoverGenre />} />
              <Route path="/books/:bookID" element={<Book user={user} />} />
              <Route path="/library/:libraryID" element={<Library />} />
            </Routes>
            </Segment>
          </SegmentGroup>
        </GridColumn>
      </Grid>
    </div>
  );
}

export default App;