import React from "react";
import { Wrapper, Main } from "../stylesheets/Layout";
import { Sidebar } from "./Sidebar";
import { Search } from "./Search";
import { SongDetail } from "./SongDetail";
import { withRouter } from "react-router";

const Dashboard = ({
  selectedSong,
  setSelectedSong,
  searchResults,
  setSearchResults,
  songData,
  setSongData,
  searchTerm,
  setSearchTerm
}) => {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("spotifyToken");
  };

  return (
    <Wrapper>
      <Sidebar setSelectedSong={setSelectedSong}></Sidebar>
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
        ></Search>
        {!!Object.keys(selectedSong).length && (
          <SongDetail
            song={selectedSong}
            songData={songData}
            selectedSong={selectedSong}
            setSelectedSong={setSelectedSong}
            setSongData={setSongData}
            setSearchResults={setSearchResults}
            setSearchTerm={setSearchTerm}
          ></SongDetail>
        )}
      </Main>
    </Wrapper>
  );
};

export default withRouter(Dashboard);
