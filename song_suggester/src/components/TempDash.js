import React from "react";
import { Wrapper, Aside, Nav, Main } from "../stylesheets/Layout";
import { Search } from "./Search";
import { SongDetail } from "./SongDetail";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const TempDash = ({
  selectedSong,
  setSelectedSong,
  searchResults,
  setSearchResults,
  songData,
  setSongData,
  searchTerm,
  setSearchTerm,
  spotifyToken,
  history
}) => {
  const logout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <Wrapper>
      <Aside>
        <Nav>
          <Link href="/dashboard" onClick={() => setSelectedSong({})}>
            <i className="fas fa-columns"></i>Dashboard
          </Link>
          <Link to="/favorites">
            <i className="far fa-heart"></i>Favorites
          </Link>
          <Link onClick={() => logout()}>
            <i className="fas fa-sign-out-alt"></i>Logout
          </Link>
        </Nav>
      </Aside>
      <Main>
        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          selectedSong={selectedSong}
          setSelectedSong={setSelectedSong}
          songData={songData}
          setSongData={setSongData}
          spotifyToken={spotifyToken}
        ></Search>
        {Object.keys(selectedSong).length && !searchTerm.search && (
          <SongDetail
            song={selectedSong}
            songData={songData}
            selectedSong={selectedSong}
            setSelectedSong={setSelectedSong}
            setSongData={setSongData}
            setSearchResults={setSearchResults}
            setSearchTerm={setSearchTerm}
            spotifyToken={spotifyToken}
          ></SongDetail>
        )}
      </Main>
    </Wrapper>
  );
};

export default withRouter(TempDash);
