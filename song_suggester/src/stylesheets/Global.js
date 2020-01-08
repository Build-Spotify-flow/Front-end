import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

    * {
        box-sizing: border-box;
    }
    html,h1,h2,h3,p,label {
        margin:0;
        color: #fff;
        font-size: 16px;
    }
  body {
    color: ${props => (props.whiteColor ? 'white' : 'black')};
    background-color: #181818;
    margin: 0;
    font-family: Roboto;
  }

  h2 {
      font-size: 1.5rem;
      text-align: center;
      margin: 10px 0 30px;
  }

  p {
      margin: 10px 0;
  }
`
export default GlobalStyle;