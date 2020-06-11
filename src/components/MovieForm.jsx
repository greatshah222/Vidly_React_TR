import React, { Component } from 'react';
import '../Modules/movie.css';
import { genres, getGenres } from '../services/fakeGenreService';
import { getMovie, saveMovie } from '../services/fakeMovieService';
import Movie from './Movie';

export class MovieForm extends Component {
  state = {
    movie: {
      title: '',
      numberInStock: '',
      dailyRentalRate: '',
      genreId: '',
    },
    errors: {},
    genres: [],
  };
  movieTitle = React.createRef();

  async componentDidMount() {
    this.movieTitle.current.focus();
    // for genres
    const genres = getGenres();
    this.setState({
      genres: genres,
    });

    // if the id is new we dont have to populate the form
    const movieId = this.props.match.params.id;
    console.log(movieId);

    if (movieId === 'new') return;
    // here we  dont use history.push cause if the movieId is wrong and if they press the back button they will go back to form again with invalid movieID
    // if there is a movie with that id we atore it in movie abd then pass to mapToViewModel
    const movie = await getMovie(movieId);
    if (!movie) return this.props.history.replace('/not-found');

    // we will set the state based on movie info
    this.setState({ movie: this.mapToViewModel(movie) });
    console.log(this.state.movie);
  }
  mapToViewModel(movie) {
    // does not run when new movie is created
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,

      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  handleChange = (e) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) {
      errors[e.currentTarget.name] = errorMessage;
    } else delete errors[e.currentTarget.name];
    const movie = { ...this.state.movie };
    movie[e.currentTarget.name] = e.currentTarget.value;
    this.setState({
      movie: movie,
      errors: errors,
    });
  };
  handleSumbit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    console.log('clicked');
    // saveMovie is in fake service movie page
    saveMovie(this.state.movie);
    console.log(this.state.movie);
    // after send we take the user back all movies page
    this.props.history.push('/movies');
  };
  validate = () => {
    const errors = {};
    if (this.state.movie.title.trim() === '') {
      errors.title = 'Title is required';
    }
    if (this.state.movie.numberInStock === '') {
      errors.numberInStock = 'Stock is required';
    }
    if (this.state.movie.dailyRentalRate === '') {
      errors.dailyRentalRate = 'Rate is required';
    }
    // if no error return null . object.keys will just give the key of that object(errors) and make a new array
    return Object.keys(errors).length === 0 ? null : errors;
  };
  validateProperty = (input) => {
    if (input.name === 'title') {
      if (input.value.trim() === '') {
        return 'Title is required';
      }
    }
    if (input.name === 'numberInStock') {
      if (input.value.trim() === '') {
        return 'Stock is required';
      }
    }
    if (input.name === 'dailyRentalRate') {
      if (input.value.trim() === '') {
        return 'rate is required';
      }
    }
  };
  render() {
    return (
      <div>
        <button
          className='save-movie'
          onClick={() => this.props.history.push('/movies')}
        >
          Back
        </button>
        <h1>Add New Movie</h1>
        <form onSubmit={this.handleSumbit}>
          <div className='login-container'>
            <div className='login-container-primary'>
              <label htmlFor='title'>Title</label>
              <input
                value={this.state.movie.title}
                onChange={this.handleChange}
                type='text'
                placeholder='Enter your movie Title'
                className='input-login'
                id='title'
                name='title'
                ref={this.movieTitle}
              />
            </div>
            {this.state.errors.movieTitle && (
              <div className='alert alert-danger'>
                {this.state.errors.movieTitle}
              </div>
            )}
            <div className='login-container-primary'>
              <label htmlFor='numberInStock'>Stocks</label>
              <input
                type='number'
                placeholder='Enter your Stock'
                className='input-login'
                id='numberInStock'
                onChange={this.handleChange}
                value={this.state.movie.numberInStock}
                name='numberInStock'
              />
            </div>
            {this.state.errors.numberInStock && (
              <div className='alert alert-danger'>
                {this.state.errors.numberInStock}
              </div>
            )}
            <div className='login-container-primary'>
              <label htmlFor='genreId'>Genre</label>
              <select
                type='number'
                placeholder='Enter your Stock'
                className='input-login'
                id='genreId'
                onChange={this.handleChange}
                value={this.state.movie.genreId}
                name='genreId'
              >
                <option value='' />

                {this.state.genres.map((el) => (
                  <option key={el._id} value={el._id}>
                    {el.name}
                  </option>
                ))}
              </select>
            </div>

            <div className='login-container-primary'>
              <label htmlFor='dailyRentalRate'>Rate</label>
              <input
                type='number'
                placeholder='Enter your Rate'
                className='input-login'
                id='dailyRentalRate'
                onChange={this.handleChange}
                value={this.state.movie.dailyRentalRate}
                name='dailyRentalRate'
              />
            </div>
            {this.state.errors.rate && (
              <div className='alert alert-danger'>{this.state.errors.rate}</div>
            )}

            <button className='button-login'>Add New Movie</button>
          </div>
        </form>
      </div>
    );
  }
}

export default MovieForm;
