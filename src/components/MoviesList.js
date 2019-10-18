import React, { Component } from "react";
import styles from "../App.module.css";
import MovieDetails from "./MovieDetails";

class MoviesList extends Component {
  state = {
    movies: null,
    total_results: null,
    // per_page: null,
    current_page: 1,
    total_pages: null
  };

  makeHttpRequestWithPage = async pageNumber => {
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=bbd805027f9a17fd9bd66920577e00a4&language=en-US&page=${pageNumber}&sort_by=primary_release_date.desc&primary_release_date.gte=2019-10-18&primary_release_date.lte=2019-12-31`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );

    const data = await response.json();

    // const per_page = Math.ceil(data.total_results / data.total_pages);

    this.setState({
      movies: data.results,
      total_results: data.total_results,
      //   per_page: per_page,
      current_page: data.page,
      total_pages: data.total_pages
    });
    // console.log(this.state);
  };

  componentDidMount() {
    this.makeHttpRequestWithPage(1);
  }

  render() {
    //making array of pages coming from api
    let pages = [];
    for (let i = 1; i <= this.state.total_pages; i++) {
      pages.push(
        <span
          className={styles.paginationSpan}
          key={i}
          onClick={() => this.makeHttpRequestWithPage(i)}
        >
          {i}
        </span>
      );
    }

    let movies, filteredMovies;

    if (this.state.movies) {
      filteredMovies = this.state.movies.filter(movie => {
        if (movie.popularity > 10) {
          return true;
        } else {
          return false;
        }
      });
    }

    if (filteredMovies) {
      movies = filteredMovies.map(movie => {
        return (
          <div key={movie.id} className={styles.cards}>
            <MovieDetails id={movie.id} />
          </div>
        );
      });
    }

    return (
      <div className={styles.app}>
        {movies}
        <div className={styles.pagination}>{pages}</div>
      </div>
    );
  }
}
export default MoviesList;
