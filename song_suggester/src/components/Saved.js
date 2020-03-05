import React from "react";
import { Wrapper, Aside, Nav, Main } from "../stylesheets/Layout";
import { FavCard, Fav } from "../stylesheets/Favorites";
import {
  Artist,
  Thumb,
  SongName,
  ArtistName
} from "../stylesheets/SearchResults";
const Saved = () => {
  return (
    <Wrapper>
      <Aside>
        <Nav>
          <a href="/dashboard">
            <i className="fas fa-columns"></i>Dashboard
          </a>
          <a href="/favorites">
            <i className="far fa-heart"></i>Favorites
          </a>
          <a href="logout">
            <i className="fas fa-sign-out-alt"></i>Logout
          </a>
        </Nav>
      </Aside>
      <Main>
        <FavCard>
          <div>
            <Thumb src="https://i.scdn.co/image/ab67616d000048514d9f7b88e82db31d13ac6668" />
            <Artist>
              <ArtistName>Gorillaz</ArtistName>
              <SongName>One Percent</SongName>
            </Artist>
          </div>
          <Fav>
            <i className="fas fa-heart"></i>
          </Fav>
        </FavCard>
        <FavCard>
          <div>
            <Thumb src="https://i.scdn.co/image/ab67616d0000485184e0a5f22d758260588fc2ca" />
            <Artist>
              <ArtistName>Thundercat</ArtistName>
              <SongName>King of the Hill</SongName>
            </Artist>
          </div>
          <Fav>
            <i className="fas fa-heart"></i>
          </Fav>
        </FavCard>
        <FavCard>
          <div>
            <Thumb src="https://i.scdn.co/image/ab67616d000048519b6ac98a52f62d5cb473da40" />
            <Artist>
              <ArtistName>The Neighbourhood</ArtistName>
              <SongName>Blue</SongName>
            </Artist>
          </div>
          <Fav>
            <i className="fas fa-heart"></i>
          </Fav>
        </FavCard>
        <FavCard>
          <div>
            <Thumb src="https://i.scdn.co/image/a1a62f04a9d696c37e3688f44398a43121c33776" />
            <Artist>
              <ArtistName>Matt Quentin</ArtistName>
              <SongName>Just A Moment</SongName>
            </Artist>
          </div>
          <Fav>
            <i className="fas fa-heart"></i>
          </Fav>
        </FavCard>
        <FavCard>
          <div>
            <Thumb src="https://i.scdn.co/image/ab67616d0000485122c614bdaf27ea223bcb2add" />
            <Artist>
              <ArtistName>Gregory Alan Isakov</ArtistName>
              <SongName>Powder</SongName>
            </Artist>
          </div>
          <Fav>
            <i className="fas fa-heart"></i>
          </Fav>
        </FavCard>
      </Main>
    </Wrapper>
  );
};

export default Saved;
