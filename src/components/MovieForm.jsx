import React from 'react';
import '../Modules/movie.css';

export default function MovieForm({ match, history }) {
  return (
    <div>
      <h1>Movies form {match.params.id}</h1>
      {/* history push will take the page back to /movies cause it was initiated
      from there */}
      <button className='save-movie' onClick={() => history.push('/movies')}>
        Save
      </button>
    </div>
  );
}
