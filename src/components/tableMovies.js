import React, { Component } from 'react';
import Movie from './Movie';
import TableHeader from '../common/TableHeader';
import '../Modules/movie.css';
import { Link } from 'react-router-dom';

class tableMovies extends Component {
  // we are initalizing here state and not as a state because it will not be changed through out the lifecycle of this components
  columns = [
    { path: 'title', label: 'Title' },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    // this empthy object are for delete and like. but we have to set the key in TableHeader so initalizing them with anything like key
    { key: 'like' },
    { key: 'delete' },
  ];

  render() {
    return (
      <div>
        <p>
          {this.props.numOfMovie > 0
            ? `There are ${this.props.numOfMovie} in the store `
            : 'No movies to display'}
        </p>
        <Link to='/movies/new' className='save-movie'>
          Add New movie
        </Link>
        <table>
          <TableHeader
            columns={this.columns}
            // on Sort is an function which is called
            sortColumn={this.props.sortColumn}
            onSort={this.props.onSort}
          />
          {/* rendering the movies based on pagination */}
          {this.props.movies.map((movie) => (
            <Movie
              key={movie._id}
              movie={movie}
              onDelete={this.props.handleMovieDelete}
              onLiked={this.props.handleMovieLike}
            ></Movie>
          ))}
        </table>
      </div>
    );
  }
}

export default tableMovies;
