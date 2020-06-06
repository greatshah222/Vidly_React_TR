import React, { Component } from 'react';
import Like from '../common/Like';

class Movie extends Component {
  render() {
    return (
      <tbody>
        <tr>
          <td>{this.props.movie.title}</td>
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
