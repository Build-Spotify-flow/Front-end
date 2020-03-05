import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { spotifyAPI } from "../utils/spotifyAPI";
import { SearchResults } from "./SearchResults";
import {
  Form,
  FormInput,
  FormLabel,
  FormValidationWarning
} from "../stylesheets/Form";

export const Search = ({
  searchTerm,
  setSearchTerm,
  searchResults,
  setSearchResults,
  setSelectedSong,
  setSongData
}) => {
  const { register, errors } = useForm();

  useEffect(() => {
    if (searchTerm.search !== "") {
      spotifyAPI()
        .get(`search?q=${encodeURI(searchTerm.search)}&type=track`)
        .then(res => setSearchResults(res.data.tracks.items))
        .catch(err => console.error(err));
    }
  }, [searchTerm, setSearchResults]);

  const handleInput = e => {
    setSearchTerm({ ...searchTerm, [e.target.id]: e.target.value });
  };

  return (
    <Form>
      <FormLabel htmlFor="search" style={{ margin: ".5rem 0" }}>
        Search:
      </FormLabel>
      <FormInput
        style={{ marginBottom: "1rem" }}
        id="search"
        name="search"
        type="text"
        onChange={handleInput}
        value={searchTerm.search}
        ref={register({
          minlength: 1,
          pattern: {
            value: /^[a-zA-Z0-9 ]*$/g, // /^[a-z\d\-_\s]+$/i
            message: "Please only enter alphanumeric characters"
          }
        })}
      />
      {errors.search && (
        <FormValidationWarning>{errors.search.message}</FormValidationWarning>
      )}

      <SearchResults
        songs={searchResults}
        setSelectedSong={setSelectedSong}
        setSearchResults={setSearchResults}
        setSongData={setSongData}
        setSearchTerm={setSearchTerm}
      ></SearchResults>
    </Form>
  );
};
export default Search;
