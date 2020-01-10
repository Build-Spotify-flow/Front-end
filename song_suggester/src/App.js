import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
// import { url } from "../utils/spotifyAPI";

// Application Component Imports

import { Navigation } from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Saved from "./components/Saved";
import Register from "./components/Register";
import { Search } from "./components/Search";

// Milo
import TempDash from "./components/TempDash";
import Header from "./components/Header";
import GlobalStyle from "./stylesheets/Global";

function App() {
  const [searchTerm, setSearchTerm] = useState({ search: "" });
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSong, setSelectedSong] = useState({});
  const [songData, setSongData] = useState({});
  const [spotifyToken, setSpotifyToken] = useState("");

  const baseUrl = "https://accounts.spotify.com/authorize";
  const clientID = "46e78711e2c14c21a689149e27b79266";
  const redirect = "http://localhost:3000/dashboard";
  const scope = "user-read-private";
  const url = `${baseUrl}?client_id=${clientID}&redirect_uri=${redirect}&scope=${scope}&response_type=token`;

  useEffect(() => {
    const url = window.location.href;
    // extract token from url and set as state
    setSpotifyToken(url.substring(url.indexOf("=") + 1, url.indexOf("&")));
  }, []);

  return (
    <div className="app-wrapper">
      <GlobalStyle />
      <Header></Header>
      <Route path="/" component={Navigation} />
      {/* <Route exact path="/" render={() => <Redirect to="/dashboard" />} /> */}
      <Route exact path="/" component={() => (window.location.href = url)} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      {/* <PrivateRoute exact path="/dashboard" component={Dashboard} />  */}
      <PrivateRoute exact path="/dashboard">
        <TempDash
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          selectedSong={selectedSong}
          setSelectedSong={setSelectedSong}
          songData={songData}
          setSongData={setSongData}
          spotifyToken={spotifyToken}
        ></TempDash>
      </PrivateRoute>
      <Route path="/favorites" component={Saved} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/dashboard2" component={Dashboard} />
      <PrivateRoute path="/dashboard/saved" component={Saved} />
    </div>
  );
}

export default App;
