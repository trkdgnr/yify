import React, { Component } from "react";
import axios from "axios";

import MoviePage from "./MoviePage";
import { encodeUrlParams } from "../utils";

const yifyUrl = "https://yts.am/api/v2/";
const yify_movie_details = "movie_details.json";

class MoviePageContainer extends Component {
  state = {
    imgUrls: { medium_cover_image: "" },
    title: "",
    year: "",
  };

  fetch = () => {
    this.setState({
      imgUrls: {
        medium_cover_image: "https://yts.am/assets/images/movies/a_star_is_born_2018/medium-cover.jpg"
      },
      title: "A Star Is Born",
      year: 2018
    });
  }

  componentDidMount() {
    this.fetch();
  }

  render() {
    const { imgUrls, title, year } = this.state;
    return (
      <MoviePage 
        imgUrls={imgUrls}
        title={title}
        year={year}/>
    );
  }
}

export default MoviePageContainer;