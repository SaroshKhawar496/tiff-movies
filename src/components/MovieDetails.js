import React, { Component } from "react";
import styles from "../App.module.css";
import axios from "axios";

class MovieDetails extends Component {
  //https://api.themoviedb.org/3/movie/343611?api_key=bbd805027f9a17fd9bd66920577e00a4
  state = {
    movieDetails: {
      title: "",
      desc: "",
      genres: [],
      tag_line: "",
      runtime: null
    },
    open: false
  };

  toggleInfo = e => {
    console.log(this.state.open);
    this.setState(prevState => ({
      ...prevState.movieDetails,
      open: !prevState.open
    }));
  };
  componentDidMount() {
    //make api call to get individual movie info.
    // let details;

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${this.props.id}?api_key=bbd805027f9a17fd9bd66920577e00a4`
      )
      .then(res => {
        let genres = [];
        res.data.genres.forEach(gen => {
          genres.push(gen.name + " ");
        });
        this.setState(prevState => ({
          ...prevState,
          movieDetails: {
            title: res.data.title,
            desc: res.data.overview,
            genres: genres,
            tag_line: res.data.tagline,
            runtime: res.data.runtime
          }
        }));
        // details = (
        //   <div>
        //     <h3>{res.data.title}</h3>
        //     <p>
        //       <strong>Description:</strong> {res.data.overview}
        //     </p>
        //     <div>
        //       <p>
        //         <strong>Genres:</strong>
        //       </p>
        //       {res.data.genres.map(gen => {
        //         return (
        //           <div key={gen.id}>
        //             <span>{gen.name}</span>
        //           </div>
        //         );
        //       })}
        //     </div>
        //     <p>
        //       <strong> Tag Line: </strong>
        //       {res.data.tagline ? res.data.tagline : <span>N/A</span>}
        //     </p>
        //     <p>
        //       <strong> Run Time: </strong>
        //       {res.data.runtime ? res.data.runtime : <span>N/A</span>} minutes
        //     </p>
        //   </div>
        // );
        // this.setState(prevState => ({
        //   ...prevState,
        //   movieDetails: details
        // }));
        // console.log(res);
        // console.log(genres);
      });
  }
  render() {
    let movieDetails = (
      <div>
        <p>
          <strong>Description:</strong> {this.state.movieDetails.desc}
        </p>
        <p>
          <strong>Genres:</strong> {this.state.movieDetails.genres}
        </p>
        <p>
          <strong> Tag Line: </strong>
          {this.state.movieDetails.tag_line ? (
            this.state.movieDetails.tag_line
          ) : (
            <span>N/A</span>
          )}
        </p>
        <p>
          <strong> Run Time: </strong>
          {this.state.movieDetails.runtime ? (
            this.state.movieDetails.runtime
          ) : (
            <span>N/A</span>
          )}{" "}
          minutes
        </p>
      </div>
    );
    return (
      <div className={styles.card}>
        <h3 className={styles.movie_title} onClick={e => this.toggleInfo(e)}>
          {this.state.movieDetails.title}
        </h3>
        {this.state.open ? <div>{movieDetails}</div> : null}
      </div>
    );
  }
}

export default MovieDetails;
