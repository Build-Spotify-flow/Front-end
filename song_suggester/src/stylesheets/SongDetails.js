import styled from "styled-components";

export const LargeCard = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #282828;
  border: 1px solid #121212;
  margin-top: 20px;
  padding: 60px;
`;

export const Frame = styled.div`
  width: 50%;
  height: auto;
  margin: 0 auto;

  iframe {
    border: 1px solid #121212;
  }
`;

export const AddToFav = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  i {
    position: absolute;
    color: #1db954;
    font-size: 2rem;
    cursor: pointer;
  }
  .fas {
    opacity: 0;
  }

  .fas:hover {
    opacity: 1;
  }

  .far {
    opacity: 1;
  }
  .far:hover {
    opacity: 0;
  }

  h3 {
    margin-left: 40px;
  }
`;

export const FollowBackground = styled.div`
  display: inline-block;
  width: 75%;
  background-color: #4c4c4c;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SimilarCard = styled.div`
  width: 100%;
  height: 80px;
  padding: 12px;
  background-color: #181818;
  border: 1px solid #282828;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;

  :hover {
    background-color: #151515;

    img {
      transform: scale(1.2);
    }
  }
`;
export const Similar = styled.div`
  overflow: hidden;
  height: 56px;
  width: 90%;
`;
