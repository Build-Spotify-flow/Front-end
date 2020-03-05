import styled from "styled-components";
import { Link } from "react-router-dom";

export const FavsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
`;

export const FavCardLink = styled(Link)`
  width: calc(33.334% - 2rem);
  margin: 1rem;
  text-decoration: none;

  :hover {
    div {
      background-color: #3c3c3c;
    }

    img {
      transform: scale(1.1);
    }
  }
`;

export const FavCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  background-color: #282828;
  border: 1px solid #121212;
  padding: 12px;

  div {
    .fas {
      opacity: 1;
    }
  }
`;

export const Fav = styled.div`
  position: relative;

  i {
    position: absolute;
    font-size: 2rem;
    color: #1db954;
    left: -30px;
  }

  .fas {
    opacity: ${props => (props.saved ? 1 : 0)};
  }

  .fas:hover {
    opacity: ${props => (props.saved ? 0.5 : 1)};
    cursor: pointer;
  }

  .far {
    opacity: ${props => (props.saved ? 0 : 1)};
  }
  .far:hover {
    opacity: ${props => (props.saved ? 1 : 0)};
  }
`;

export const Radar = styled.div`
  margin-top: 40px;
  background-color: #181818;
  width: 90%;
  height: auto;
  padding: 40px;
  color: white;

  img {
    max-width: 100%;
    margin: 0 auto;
    filter: invert(1) hue-rotate(180deg);
  }
`;
