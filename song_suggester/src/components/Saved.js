import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { spotifyAPI } from "../utils/spotifyAPI";

import { Sidebar } from "./Sidebar";
import { Wrapper, Main } from "../stylesheets/Layout";
import { FavCard, Fav } from "../stylesheets/Favorites";
import {
  Artist,
  Thumb,
  SongName,
  ArtistName
} from "../stylesheets/SearchResults";

const Saved = ({ setSelectedSong }) => {
  const [savedSongs, setSavedSongs] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("/songs")
      .then(res => {
        return res.data.songs;
      })
      .then(songs => {
        const idString = songs.map(song => song.spotify_id).toString();
        spotifyAPI()
          .get(`/tracks/?ids=${idString}`)
          .then(res => setSavedSongs(res.data.tracks))
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <Wrapper>
      <Sidebar setSelectedSong={setSelectedSong}></Sidebar>
      <Main>
        {savedSongs.map(song => {
          return (
            <FavCard key={song.id}>
              <div>
                <Thumb src={song.album.images[2].url} />
                <Artist>
                  <ArtistName>{song.artists[0].name}</ArtistName>
                  <SongName>{song.name}</SongName>
                </Artist>
              </div>
              <Fav>
                <i className="fas fa-heart"></i>
              </Fav>
            </FavCard>
          );
        })}
      </Main>
    </Wrapper>
  );
};

export default Saved;
