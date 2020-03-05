import React from "react";
import styled, { keyframes } from "styled-components";

export const Notification = ({ message }) => {
  if (message) {
    return (
      <Snackbar>
        <p>{message}</p>
      </Snackbar>
    );
  } else return null;
};

const FadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translate(-50%, 0);
}

99% {
    opacity: 0;
    transform: translate(-50%, -50px);
}

100% {
    transform: translate(-50%, 0);
    opacity: 0;
    display: none;
  }
`;

const Snackbar = styled.div`
  position: absolute;
  top: -3.3rem;
  z-index: 10;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.25rem;
  width: 90%;
  background-color: #eee;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
  animation: ${FadeOut} 3s ease-out forwards;

  p {
    text-align: center;
    color: black;
  }
`;
