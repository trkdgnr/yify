import React from "react";
import { shape, number, string, bool, func, arrayOf, oneOf } from 'prop-types';
import classNames from "classnames";


const Torrents = ({ torrents }) => {
  const isNotMultiple = quality => torrents.filter(torrent => torrent.quality === quality).length <= 1;
  const isSingleSource = ["720p", "1080p", "3D"].every(isNotMultiple);

  return (
    <ul>
      {torrents.map(torrent => {
        const { url, quality, source_type, seeds, peers, size } = torrent;
        return (
        <li key={url}><a href={url} className="movieCard--torrents--button">
          { !isSingleSource && 
            <span className="movieCard--torrents--button--sourceType">{source_type} </span>
          }
          <span className="movieCard--torrents--button--quality">{quality} </span>
          <span className="movieCard--torrents--button--seeds">{seeds}</span>
          <span>/</span>
          <span className="movieCard--torrents--button--peers">{peers} </span>
          <span className="movieCard--torrents--button--size">{size}</span>
        </a></li>);}
      )}
    </ul>
  );
}



const MovieCard = ({ movie, err, onClick, isActive }) => {
  const divClick = (e) => {
    e.preventDefault();
    onClick();
  };
  if (!!err) return <h2>{err}</h2>;

  const { title, year, imgs, genres, ratings, texts, awards, imdb_code, duration, torrents } = movie;
  return (
    
    <div id="container">

      <div className="movieCard--visible" onClick={divClick}>
        <img className="imaj" src={imgs.medium} alt="Movie Poster"/>
        <div className="movieCard--visible--mainInfo">
          <h2>{title}</h2>
          <h3>{year}</h3>
          <h4>{genres.join(", ")}</h4>
 
        </div>
        <ul className="movieCard--visible--ratings">
          {ratings && ratings.map(rating => 
            <li key={rating.source}>
              <span className="movieCard--visible--ratings--source">{rating.source}: </span>
              <span className="movieCard--visible--ratings--value">{rating.value}</span>
            </li>
          )}
        </ul>
      </div>

      <div className={classNames("movieCard--volatile", {"movieCard--isActive": isActive})}>
        <div className="movieCard--infos">
          <div className="movieCard--infos--texty">
            <p className="movieCard--infos--texty--description">{texts.omdb}</p>
          </div>
          <div className="movieCard--infos--rest">
            <a href={"https://www.imdb.com/title/"+imdb_code}
              className="movieCard--infos--rest--imdbButton"
            >IMDb</a>
            <p>Duration: <span className="movieCard--infos--rest--durationValue">
              {duration}</span></p>
              <p className="movieCard--infos--texty--awards">{awards}</p>
          </div>
          <div className="movieCard--torrents">
          <Torrents torrents={torrents} />
        </div>
        </div>

      </div>


    </div>
 
  );
};

MovieCard.propTypes = {
  movie: shape({
    imdb_code: string.isRequired,
    title: string.isRequired,
    year: number.isRequired,
    duration: number,
    awards: string,
    genres: arrayOf(string),
    texts: shape({
      yify: string,
      omdb: string,
    }),
    language: string,
    imgs: shape({
      small: string,
      medium: string,
      large: string,
      background: string, // choose between original and processed
      omdb: string,
    }),
    ratings: arrayOf(shape({
      source: oneOf(["Internet Movie Database", "Rotten Tomatoes", "Metacritic"]),
      value: string,
    })),
    torrents: arrayOf(shape({
      url: string,
      quality: oneOf(["720p", "1080p", "3D"]),
      source_type: oneOf(["bluray", "web"]),
      seeds: number,
      peers: number,
      size: string,      // "1.55 GB"
    }))
  }),
  err: string,
  onClick: func.isRequired,
  isActive: bool.isRequired,
}

export default MovieCard;
