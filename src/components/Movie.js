import React, { Component } from 'react';
import Like from '../common/Like';
import { Link } from 'react-router-dom';

class Movie extends Component {
  render() {
    return (
      <tbody>
        <tr>
          <td>
            <Link to={`/movies/${this.props.movie._id}`}>
              {this.props.movie.title}
            </Link>
          </td>
          <td>{this.props.movie.genre.name}</td>
          <td>{this.props.movie.numberInStock}</td>
          <td>{this.props.movie.dailyRentalRate}</td>
          <td>
            <button
              onClick={() => this.props.onDelete(this.props.movie._id)}
              className='delete-movie'
            >
              Delete
            </button>
          </td>
          <td>
            <Like
              onClick={() => this.props.onLiked(this.props.movie)}
              liked={this.props.movie.liked}
            />
          </td>
        </tr>
      </tbody>
    );
  }
}

export default Movie;
