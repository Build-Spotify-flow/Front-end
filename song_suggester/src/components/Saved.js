import React, { useState, useEffect, useCallback } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import { spotifyAPI } from "../utils/spotifyAPI";

import { Sidebar } from "./Sidebar";
import { Wrapper, Main } from "../stylesheets/Layout";
import {
  FavCard,
  Fav,
  FavCardLink,
  FavsContainer
} from "../stylesheets/Favorites";
import {
  Artist,
  Thumb,
  ThumbContainer,
  SongName,
  ArtistName
} from "../stylesheets/SearchResults";

const Saved = ({
  setSelectedSong,
  setSearchTerm,
  setSearchResults,
  setSongData
}) => {
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

  const updateSong = useCallback(
    async song => {
      setSelectedSong(song);
      setSearchResults([]);
      setSearchTerm({ search: "" });

      try {
        const res = await spotifyAPI().get(`audio-features/${song.id}`);

        const {
          danceability,
          energy,
          key,
          loudness,
          mode,
          speechiness,
          acousticness,
          instrumentalness,
          liveness,
          valence,
          tempo,
          duration_ms,
          time_signature
        } = res.data;

        setSongData({
          track_id: song.id,
          popularity: song.popularity,
          danceability,
          energy,
          key,
          loudness,
          mode,
          speechiness,
          acousticness,
          instrumentalness,
          liveness,
          valence,
          tempo,
          duration_ms,
          time_signature
        });
      } catch (err) {
        console.error(err);
      }
    },
    [setSelectedSong, setSearchResults, setSearchTerm, setSongData]
  );

  return (
    <Wrapper>
      <Sidebar setSelectedSong={setSelectedSong}></Sidebar>
      <Main>
        <FavsContainer>
          {savedSongs.map(song => {
            return (
              <FavCardLink
                key={song.id}
                to="/dashboard"
                onClick={() => updateSong(song)}
              >
                <FavCard>
                  <div style={{ overflow: "hidden" }}>
                    <ThumbContainer>
                      <Thumb src={song.album.images[2].url} />
                    </ThumbContainer>
                    <Artist>
                      <ArtistName>{song.artists[0].name}</ArtistName>
                      <SongName>{song.name}</SongName>
                    </Artist>
                  </div>
                  <Fav saved onClick={() => removeFavorite(song.backend_id)}>
                    <i className="fas fa-heart"></i>
                  </Fav>
                </FavCard>
              </FavCardLink>
            );
          })}
        </FavsContainer>
      </Main>
    </Wrapper>
  );
};

export default Saved;
