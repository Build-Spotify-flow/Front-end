import React from "react";
import { Link } from "react-router-dom";
import { Aside, Nav } from "../stylesheets/Layout";

export const Sidebar = ({ setSelectedSong }) => {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("spotifyToken");
  };
  return (
    <Aside>
      <Nav>
        <Link to="/dashboard" onClick={() => setSelectedSong({})}>
          <i className="fas fa-columns"></i>Dashboard
        </Link>
        <Link to="/favorites">
          <i className="far fa-heart"></i>Favorites
        </Link>
        <Link to="/login" onClick={() => logout()}>
          <i className="fas fa-sign-out-alt"></i>Logout
        </Link>
      </Nav>
    </Aside>
  );
};
