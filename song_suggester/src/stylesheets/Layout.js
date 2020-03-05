import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 64px);
  display: relative;
`;

export const Aside = styled.aside`
  width: 240px;
  height: 100vh;
  top: 64px;
  background-color: #121212;
  position: fixed;
`;
export const Nav = styled.nav`
  margin: 40px 0 0 40px;

  a {
    display: block;
    color: #fff;
    text-decoration: none;
    margin: 15px 0;
    font-size: 1.2rem;
  }
  a:hover {
    color: #999;
  }
`;

export const Main = styled.main`
  position: absolute;
  width: calc(100vw - 260px);
  top: 64px;
  left: 240px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  h2,
  p {
    text-align: left;
  }
`;
