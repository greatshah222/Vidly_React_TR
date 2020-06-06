import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import ListGroup from '../common/ListGroup';
import '../Modules/movie.css';
import Pagination from '../common/Pagination';
import { paginate } from '../utils/Paginate';
import TableMovies from './tableMovies';
import _ from 'lodash';
// fo rbugChecking we need to install a libray called PropTypes from npm
// npm i prop-types
class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: '',
    sortColumn: '',
  };
  componentDidMount() {
    // this is right place to call because we need to do aja call to backend service to get data. we have to initalize an empty array so that we dont get an error

    this.setState({ movies: getMovies(), genres: getGenres() });
  }
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
    //console.log(page);
  };
  handleMovieLike = (movie) => {
    //console.log(movieID, 'clicked');
    // cloning the main movies
    const movies = [...this.state.movies];

    const index = movies.indexOf(movie);

    // clining the single movie that is passed in our parameter
    //movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies: movies });
  };
  handelGenreSelect = (genre) => {
    // console.log('secleted gernre', genre);
    // whenever we select the genre we set reset the currentPage to 1
    this.setState({ selectedGenre: genre, currentPage: 1 });
    // when the state is change the render is re-render and then we can pass the sectedGenre from the props
  };
  handleAllGenre = () => {
    //console.log('selected all genre');
    this.setState({ selectedGenre: '' });
  };
  handleSort = (sortColumn) => {
    //console.log(path);

    this.setState({ sortColumn: sortColumn });
  };
  getPageDataSortAndPaginate = () => {
    // we need to apply the filter before paginate so if the id od´f sleected genre matches with movie id from the state movies it will filter that
    const filtered = this.state.selectedGenre
      ? this.state.movies.filter(
          (movie) => movie.genre._id === this.state.selectedGenre._id
        )
      : this.state.movies;
    // sorting data
    // if orders is not illustrated it will do be asc
    // _.orderBy(collection, [iteratees=[_.identity]], [orders])

    const sorted = _.orderBy(
      filtered,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );

    // sending the movies array for paginate based on currentPage and pageSize
    const movies = paginate(
      sorted,
      this.state.currentPage,
      this.state.pageSize
    );
    return { numOfMovie: filtered.length, movies: movies };
  };

  render() {
    const { numOfMovie, movies } = this.getPageDataSortAndPaginate();
    const totalNumberOfItems = numOfMovie;

    return (
      <div className='movies-primary'>
        <div className='vertical-navbar'>
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handelGenreSelect}
            selectedGenre={this.state.selectedGenre}
            onAllItemSelect={this.handleAllGenre}
          />
        </div>
        <div className='tableMovies'>
          <TableMovies
            numOfMovie={totalNumberOfItems}
            movies={movies}
            handleMovieDelete={this.handleMovieDelete}
            handleMovieLike={this.handleMovieLike}
            onSort={this.handleSort}
            sortColumn={this.state.sortColumn}
          />
          <Pagination
            // if we do this it will fail validation of propTypes and give an error eg
            // itemsCount='abx' cause we have specified the property in pagination page
            itemsCount={totalNumberOfItems}
            currentPage={this.state.currentPage}
            pageSize={this.state.pageSize}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
