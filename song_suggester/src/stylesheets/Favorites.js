import styled from "styled-components";

export const FavCard = styled.div`
    width: 30%;
    height: 80px;
    margin: 10px;
    background-color: #282828;
    border:1px solid #121212;
    padding: 12px;
    display:flex;
    flex-direction: row;
    justify-content: space-between;

    div {
        .fas {
            opacity:1;
        }
    }
`
export const Fav = styled.div`
    position: relative

    i {
        position:absolute;
        font-size: 2rem;
        color: #1DB954;
        left: -30px;
    }

    .fas {
        opacity: ${props => (props.saved ? 1 : 0)};
    }

    .fas:hover {
        opacity: ${props => (props.saved ? .5 : 1)};
        cursor: pointer;
    }

    .far {
        opacity: ${props => (props.saved ? 0 : 1)};
    }
    .far:hover {
        opacity: ${props => (props.saved ? 1 : 0)};
    }
`

export const Radar = styled.div`
    margin-top: 40px;
    background-color: #181818;
    width: 90%;
    height: auto;
    padding: 40px;
    color: white;

    img {
        max-width: 100%;
        margin:0 auto;
        filter: invert(1) hue-rotate(180deg);
    }
`