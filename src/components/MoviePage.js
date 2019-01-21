import React from "react";
import PropTypes from "prop-types";

const MoviePage = ({
  title, 
  year,
  torrents,
  imgUrls,
  language,
  description,
  genres,
  runtime,
  actors,
  director,
  awards,
  ratings,
  imdbUrl
}) => (
  <div>
    <img src={imgUrls.medium_cover_image} alt="Poster"/>
    <h1>{title}</h1>
    <h3>{year}</h3>
  </div>
);

/*
MoviePage.propTypes = {
  title: PropTypes.string.isRequired,
  posterUrl: PropTypes.string.isRequired,
  pageUrl: PropTypes.string.isRequired,
  ratings: PropTypes.arrayOf(
    PropTypes.shape({
      source: PropTypes.string,
      value: PropTypes.string
    })
  )
};
*/
export default MoviePage;