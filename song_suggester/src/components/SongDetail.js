import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import {
  LargeCard,
  Frame,
  AddToFav,
  Similar,
  SimilarCard
} from "../stylesheets/SongDetails";

import {
  Thumb,
  Artist,
  ArtistName,
  SongName
} from "../stylesheets/SearchResults";

import { Fav, Radar } from "../stylesheets/Favorites";
import { axiosWithAuth } from "../utils/axiosWithAuth";

export const SongDetail = ({
  song,
  songData,
  setSelectedSong,
  setSongData,
  setSearchResults,
  setSearchTerm,
  spotifyToken,
  selectedSong
}) => {
  const [recommendedSongIDs, setRecommendedSongIDs] = useState([]);
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [songRadarGraph, setSongRadarGraph] = useState("");

  useEffect(() => {
    // prevent sending empty requests to DS API
    if (Object.keys(songData).length) {
      axios
        .post(
          "https://cors-anywhere.herokuapp.com/https://spotify-flow-ds.herokuapp.com/input",
          songData,
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          setRecommendedSongIDs(res.data.recommended_song_ids);
          setSongRadarGraph(res.data.radar_chart);
        })
        .catch(err => console.error(err));
    }
  }, [songData, selectedSong]);

  useEffect(() => {
    let listOfIDs = "";
    if (recommendedSongIDs !== undefined) {
      recommendedSongIDs.map(id => (listOfIDs += `${id},`));
      listOfIDs = listOfIDs.substring(0, listOfIDs.length - 1);
    }

    // prevent sending empty requests to spotify API
    if (listOfIDs.length) {
      axios
        .get(`https://api.spotify.com/v1/tracks/?ids=${listOfIDs}`, {
          headers: {
            Authorization: `Bearer ${spotifyToken}`,
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
        .then(res => setRecommendedSongs(res.data.tracks))
        .catch(err => console.error(err));
    }
  }, [recommendedSongIDs, spotifyToken]);

  const updateSong = useCallback(
    async song => {
      setSelectedSong(song);
      setSearchResults([]);
      setSearchTerm({ search: "" });

      try {
        const baseUrl = "https://api.spotify.com/v1/audio-features";
        const res = await axios.get(`${baseUrl}/${song.id}`, {
          headers: {
            Authorization: `Bearer ${spotifyToken}`,
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        });

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
    [
      setSelectedSong,
      setSearchResults,
      setSearchTerm,
      setSongData,
      spotifyToken
    ]
  );

  const addToFavorites = async (e, songID) => {
    e.stopPropagation();
    try {
      const res = await axiosWithAuth().post(
        "https://cors-anywhere.herokuapp.com/https://spotify-song-suggester-be.herokuapp.com/api/tracks/like",
        { trackid: songID }
      );
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <LargeCard>
      <Frame>
        <iframe
          src={`https://open.spotify.com/embed/track/${song.id}`}
          width="90%"
          height="380"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
          title="spotifyPlayer"
        ></iframe>
        <AddToFav onClick={e => addToFavorites(e, song.id)}>
          <i className="far fa-heart"></i>
          <i className="fas fa-heart"></i>
          <h3>Add to Favorites</h3>
        </AddToFav>
        <Radar>
          <h2>Feel the Beat!</h2>
          {!songRadarGraph && (
            <Loader
              type="Audio"
              color="#1DB954"
              height={200}
              width={200}
              style={{ marginLeft: "25%", marginTop: "10rem" }}
            ></Loader>
          )}
          {songRadarGraph && (
            <img
              alt={song.name}
              src={`data:image/jpeg;base64,${songRadarGraph}`}
            ></img>
          )}
        </Radar>
      </Frame>
      <Frame>
        <h2>You might like</h2>

        {!recommendedSongs.length && (
          <Loader
            type="Audio"
            color="#1DB954"
            height={200}
            width={200}
            style={{ marginLeft: "25%", marginTop: "10rem" }}
          ></Loader>
        )}

        {recommendedSongs.map(song => (
          <SimilarCard
            key={song.id}
            onClick={() => {
              setRecommendedSongs([]);
              updateSong(song);
              setSongRadarGraph("");
            }}
          >
            <Similar>
              <Thumb src={song.album.images[2].url} />
              <Artist>
                <ArtistName>{song.artists[0].name}</ArtistName>
                <SongName>{song.name}</SongName>
              </Artist>
            </Similar>
            <Fav onClick={e => addToFavorites(e, song.id)}>
              <i className="far fa-heart"></i>
              <i className="fas fa-heart"></i>
            </Fav>
          </SimilarCard>
        ))}
      </Frame>
    </LargeCard>
  );
};
