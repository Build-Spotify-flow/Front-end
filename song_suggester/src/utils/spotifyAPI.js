import axios from "axios";

export const spotifyAPI = () => {
  const token = window.localStorage.getItem("spotifyToken");

  return axios.create({
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    baseURL: "https://api.spotify.com/v1/"
  });
};
