import React, {Component} from "react";
//import PropTypes from "prop-types";
import MovieCard from "./MovieCard";
import axios from "axios";
import { encodeUrlParams } from "../utils";
import objectAssignDeep from "object-assign-deep";

const omdbUrl = "http://www.omdbapi.com/";
const omdbKey = "d7d8b26d";


class MovieCardContainer extends Component {
  constructor(props) {
    super(props);
    this.plotType = "short"; // "short" or "full"
    this.state = {
      movie: props.movie,
      err: ""
    };
  }

  omdbMapper = o => ({
    awards: o.Awards !== "N/A" ? o.Awards : null,
    imgs: { omdb: o.Poster },
    ratings: o.Ratings.map(oRating => ({
      source: oRating.Source,
      value: oRating.Value
    })),
    texts: { omdb: o.Plot }, // choice on API
  });

  createOmdbUrl = imdb_code => {
    let params = {};
    if (imdb_code)
      params.i = imdb_code;
    
    params.plot = this.plotType;
    params.apikey = omdbKey;
    
    const url = [omdbUrl, "?", encodeUrlParams(params) ].join("");
    return url
  }

  componentDidMount() {
    const url = this.createOmdbUrl( this.state.movie.imdb_code );

    axios(url).then(res => {
      const oMovie = this.omdbMapper(res.data);
      const merged = objectAssignDeep( {}, this.state.movie, oMovie );
      this.setState({ movie: merged });
    }).catch(err => this.setState({ err }));
  }

  render() {
    const { movie, err } = this.state;
    // console.log("render: ", movie);
    return <MovieCard movie={movie} err={err} onClick={this.props.onClick} isActive={this.props.isActive} />;
  }
}

/*
MovieCardContainer.propTypes = {
  title: PropTypes.string.isRequired,
  posterUrl: PropTypes.string.isRequired,
  pageUrl: PropTypes.string.isRequired,
  imdb_code: PropTypes.string.isRequired
};
*/

export default MovieCardContainer;