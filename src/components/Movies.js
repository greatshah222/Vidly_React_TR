import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Movie from './Movie';
import '../Modules/movie.css';
import Pagination from '../common/Pagination';

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 3,
    currentPage: 1,
  };
  handleMovieDelete = (movieID) => {
    //console.log(movieID);
    const newMovies = this.state.movies.filter(
      (movie) => movie._id !== movieID
    );
    //console.log(newMovies);
    this.setState({ movies: newMovies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
    console.log(page);
  };
  handleMovieLike = (movie) => {
    //console.log(movieID, 'clicked');
    console.log(movie);
    // cloning the main movies
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    // clining the single movie that is passed in our parameter
    //movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies: movies });
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
              <th></th>
              <th></th>
            </tr>
          </thead>
          {this.state.movies.map((movie) => (
            <Movie
              key={movie._id}
              movie={movie}
              onDelete={this.handleMovieDelete}
              onLiked={this.handleMovieLike}
            ></Movie>
          ))}
        </table>
        <Pagination
          itemsCount={this.state.movies.length}
          currentPage={this.state.currentPage}
          pageSize={this.state.pageSize}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default Movies;
