import React, { useEffect } from "react";
import { GridColumn, Grid, Segment, Image, Button, SegmentGroup } from 'semantic-ui-react';
import { Routes, Route, useNavigate } from 'react-router-dom';
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
import Account from "../pages/Account";
import { useDispatch, useSelector } from "react-redux";
import { checkSession, logoutUser, setUser } from "../store/slices/userSlice";

function App() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        navigate('/login');
      })
      .catch((error) => console.error("Logout failed:", error));
  };

  if (!user) return <Login onLogin={(user) => dispatch(setUser(user))} />;

  return (
    <div style={{ padding: '10px'}}>
      <Grid >
        <GridColumn width={4} >
          <Segment inverted style={{ height: '100%' }}>
            <Image src="/trove.png" size="large" />
            <NavBar />
          </Segment>
        </GridColumn>
        <GridColumn stretched width={12} >
          <SegmentGroup style={{ height: '100%' }}>
            <Segment textAlign="right" inverted>
                <Image src="/profile.png" avatar />
                <span style={{ paddingRight: '5px', cursor: 'pointer'}} onClick={() => navigate(`/account`)}>{user.first_name}</span>
              <Button onClick={handleLogout} >Logout</Button>
            </Segment>
            <Segment inverted >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<Books />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/library" element={<Libraries />} />
              <Route path="/about" element={<About />} />
              <Route path="/discover/:genreName" element={<DiscoverGenre />} />
              <Route path="/books/:bookID" element={<Book />} />
              <Route path="/library/:libraryID" element={<Library />} />
              <Route path="/account" element={<Account />} />
            </Routes>
            </Segment>
          </SegmentGroup>
        </GridColumn>
      </Grid>
    </div>
  );
}

export default App;