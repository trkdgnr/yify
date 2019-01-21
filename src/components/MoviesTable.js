import React from "react";
//import PropTypes from "prop-types";
import MovieCardContainer from "./MovieCardContainer";


class MoviesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null
    };
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(clicked) {
    const prevActive = this.state.active;
    if ( prevActive === clicked ) // was active already
      this.setState({ active: null });          //deactivate
    else this.setState({ active: clicked });
  }

  render() {
    const { movies, is3D } = this.props;
    const { active } = this.state;
    return (
      <div>
        {movies.map( (movie, i) => 
          <MovieCardContainer 
            isActive={ active === i }
            movie={movie} 
            key={movie.imdb_code}
            is3D={is3D}
            onClick={() => this.handleClick(i)} />
        )}
      </div>
    );
  }
}

/*
MoviesTable.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape(MovieCardContainer.propTypes)).isRequired
};
*/
export default MoviesTable;