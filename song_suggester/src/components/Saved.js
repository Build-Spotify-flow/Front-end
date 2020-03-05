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
  let backendIDs;
  const [savedSongs, setSavedSongs] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("/songs")
      .then(res => {
        let dict = {};
        res.data.songs.forEach(song => (dict[song.spotify_id] = song.song_id));
        backendIDs = dict;
        return res.data.songs;
      })
      .then(songs => {
        const idString = songs.map(song => song.spotify_id).toString();
        spotifyAPI()
          .get(`/tracks/?ids=${idString}`)
          .then(res => {
            res.data.tracks.forEach(track => {
              track.backend_id = backendIDs[track.id];
            });

            return setSavedSongs(res.data.tracks);
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }, []);

  const removeFavorite = async id => {
    try {
      await axiosWithAuth().delete(`songs/${id}`);
      setSavedSongs(savedSongs.filter(song => song.backend_id !== id));
    } catch (error) {
      console.error(error);
    }
  };

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
              <Fav onClick={() => removeFavorite(song.backend_id)}>
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
