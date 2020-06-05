import React, { Component } from 'react';
import Counter from './Counter';
import '../Modules/counter.css';

export class Counters extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.onReset} className='reset'>
          Reset
        </button>

        {this.props.counters.map((counter) => (
          <Counter
            key={counter.id}
            counter={counter}
            onIncrement={this.props.onIncrement}
            onDecrement={this.props.onDecrement}
            onDelete={this.props.onDelete}
          />
        ))}
      </div>
    );
  }
}

export default Counters;
