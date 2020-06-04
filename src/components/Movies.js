import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Movie from './Movie';

class Movies extends Component {
  state = {
    movies: getMovies(),
  };
  handleMovieDelete = (movieID) => {
    console.log(movieID);
    const newMovies = this.state.movies.filter(
      (movie) => movie._id !== movieID
    );
    console.log(newMovies);
    this.setState({ movies: newMovies });
  };

  render() {
    const numOfMovie = this.state.movies.length;
    return (
      <div className='tableMovies'>
        <p>
          {numOfMovie > 0
            ? `There are ${numOfMovie} in the store `
            : 'No movies to display'}
        </p>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th>Actions</th>
            </tr>
          </thead>
          {this.state.movies.map((movie) => (
            <Movie
              key={movie._id}
              movie={movie}
              onDelete={this.handleMovieDelete}
            ></Movie>
          ))}
        </table>
      </div>
    );
  }
}

export default Movies;
