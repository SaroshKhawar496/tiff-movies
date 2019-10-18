import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import MoviesList from "./components/MoviesList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <h1>Upcoming Movies</h1>
        <MoviesList />
      </div>
    );
  }
}

export default App;
