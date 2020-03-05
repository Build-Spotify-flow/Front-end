import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./components/Login";
import Saved from "./components/Saved";
import Register from "./components/Register";

import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import GlobalStyle from "./stylesheets/Global";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState({ search: "" });
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSong, setSelectedSong] = useState({});
  const [songData, setSongData] = useState({});

  return (
    <div className="app-wrapper">
      <GlobalStyle />
      <Header></Header>
      <Route exact path="/">
        <Redirect to="/dashboard" />
      </Route>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />

      <PrivateRoute
        exact
        path="/dashboard"
        component={Dashboard}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        selectedSong={selectedSong}
        setSelectedSong={setSelectedSong}
        songData={songData}
        setSongData={setSongData}
      ></PrivateRoute>

      <PrivateRoute path="/favorites" component={Saved} />
    </div>
  );
}

export default App;
