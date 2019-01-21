import React, { Component } from "react";
import axios from "axios";

import Browse from "./Browse";
import { encodeUrlParams } from "../utils";

const yifyUrl = "https://yts.am/api/v2/";
const yify_list_movies = "list_movies.json";


class BrowseContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      classifier: {
        is3D: false,
        genre: "all",
        rating_low: 0,
        ordering: "latest"
      },
      error: null,
      search: "",
    };

    this.updateMovies = this.updateMovies.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleClassifierChange = this.handleClassifierChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  updateMovies() {
    
    //////////// utils start

    const getYifyOrdering = ordering => {
      const dict = {
        downloads: "download_count",
        likes: "like_count",
        latest: "date_added",
        alphabetical: "title"
      };
      if (dict.hasOwnProperty(ordering)) return dict[ordering];
      return ordering;
    }

    const createYifyUrl = () => {
      const classifier = this.state.classifier;
      let params = {};
      if (classifier.is3D) 
        params.quality = "3D";
      if (classifier.genre !== "all") 
        params.genre = classifier.genre;
      if (classifier.rating_low !== 0) 
        params.minimum_rating = classifier.rating_low;
      if (classifier.ordering !== "latest")
        params.sort_by = getYifyOrdering(classifier.ordering);
      
      if (this.state.search !== "")
        params.query_term = this.state.search;
      
      const url = [yifyUrl, yify_list_movies, "?", encodeUrlParams(params)].join("");
      return url;
    }

    const yifyMapper = m => ({
      imdb_code: m.imdb_code,
      title: m.title,
      year: m.year,
      duration: m.runtime,
      genres: m.genres,
      texts: { yify: m.description_full }, // choice
      language: m.language,
      imgs: {
        small: m.small_cover_image,
        medium: m.medium_cover_image,
        large: m.large_cover_image,
        background: m.background_image // choice
      },
      torrents: m.torrents.map(yTorr => ({
        url: yTorr.url,
        quality: yTorr.quality,   // ["720p", "1080p", "3D"]
        source_type: yTorr.type,         // ["bluray", "web", ... ]
        seeds: yTorr.seeds,
        peers: yTorr.peers,
        size: yTorr.size,         // "1.55 GB"
      })).filter(myTorr => ((myTorr.quality === "3D") === this.state.classifier.is3D) )
    });

    ///////////// utils end
    ///////////// work start

    const url = createYifyUrl();

    axios(url)
      .then(res => {
        if (res.data.data.movie_count !== 0)
          this.setState({
            movies: res.data.data.movies.map(yifyMapper),
            error: null
          });
        else
          this.setState({
            movies: [],
            error: "No movies found."
          });
      })
      .catch(err => this.setState({ error: err }));
  }

  componentDidMount() {
    this.updateMovies();
  }

  handleClassifierChange(obj) {
    this.setState(
      state => ({
        classifier: Object.assign(state.classifier, obj)
      }),
      this.updateMovies
    );
  }

  handleSearchChange(searchStr) {
    this.setState({ search: searchStr });
  }

  handleSubmit() {
    this.updateMovies();
  }

  render() {
    const { classifier, movies, search, error } = this.state;
    return (
      <Browse
        classifierValues={classifier}
        onClassifierChange={this.handleClassifierChange}
        movies={movies}
        error={error}
        searchValue={search}
        onSearchChange={this.handleSearchChange}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default BrowseContainer;