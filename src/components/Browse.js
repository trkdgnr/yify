import React from "react";
import PropTypes from "prop-types";

import MovieListClassifier from "./MovieListClassifier";
import MoviesTable from "./MoviesTable";

const Browse = (props) => 
  <div className="browse">
    <MovieListClassifier 
      values={props.classifierValues}
      onClassifierChange={props.onClassifierChange}
      searchValue={props.searchValue}
      onSearchChange={props.onSearchChange}
      onSubmit={props.onSubmit}
    />
    <MoviesTable 
      movies={props.movies}
      is3D={props.classifierValues.is3D} />
    { props.error && <h2>{props.error}</h2> }
  </div>;


Browse.propTypes = {
  classifierValues: PropTypes.object.isRequired,
  onClassifierChange: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  error: PropTypes.any,
  searchValue: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default Browse;