import styled from "styled-components";
import colors from "../stylesheets/Colors";

export const SearchResultsContainer = styled.div``;

export const SearchResult = styled.p`
  font-size: 14px;
  padding: 0.75rem;
  margin: 0;
  color: ${colors.mediumBlack};

  :nth-of-type(even) {
    background-color: #606b6e;
  }

  :hover {
    background-color: #191414;
    color: #1db954;
    cursor: pointer;
  }
`;

export const SongCard = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  margin: 10px 0;
  border: 1px solid #121212;
  padding: 12px 0 12px 12px;
  background-color: #282828;

  :hover {
    background-color: #383838;
    cursor: pointer;

    img {
      transform: scale(1.2);
    }
  }
`;

export const Artist = styled.div`
  float: left;
  font-weight: 600;
  margin-left: 10px;
  color: #fff;
  vertical-align: top;
`;

export const ThumbContainer = styled.div`
  display: inline;
  overflow: hidden;
`;

export const Thumb = styled.img`
  position: relative;
  height: 56px;
  width: 56px;
  overflow: hidden;
  float: left;
  transition: 0.2s ease-out transform;
`;

export const ArtistName = styled.p`
  margin: 0 0 15px 0;
`;

export const SongName = styled.p`
  font-weight: 100;
  font-size: 1rem;
  margin: 5px 0;
`;

export const LargeCard = styled.div`
  width: 100%;
  height: auto;
  background-color: #282828;
`;
