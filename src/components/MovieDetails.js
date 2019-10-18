import React, { Component } from "react";
import styles from "../App.module.css";
import axios from "axios";

class MovieDetails extends Component {
  //https://api.themoviedb.org/3/movie/343611?api_key=bbd805027f9a17fd9bd66920577e00a4
  state = {
    movieDetails: null
  };

  componentDidMount() {
    //make api call to get individual movie info.
    let details;

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${this.props.id}?api_key=bbd805027f9a17fd9bd66920577e00a4`
      )
      .then(res => {
        details = (
          <div>
            <h3>{res.data.title}</h3>
            <p>
              <strong>Description:</strong> {res.data.overview}
            </p>
            <div>
              <p>
                <strong>Genres:</strong>
              </p>
              {res.data.genres.map(gen => {
                return (
                  <div key={gen.id}>
                    <span>{gen.name}</span>
                  </div>
                );
              })}
            </div>
            <p>
              <strong> Tag Line: </strong>
              {res.data.tagline ? res.data.tagline : <span>N/A</span>}
            </p>
            <p>
              <strong> Run Time: </strong>
              {res.data.runtime ? res.data.runtime : <span>N/A</span>} minutes
            </p>
          </div>
        );
        this.setState(prevState => ({
          ...prevState,
          movieDetails: details
        }));
        // console.log(res);
        // console.log(genres);
      });
  }
  render() {
    return <div className={styles.card}>{this.state.movieDetails}</div>;
  }
}

export default MovieDetails;
