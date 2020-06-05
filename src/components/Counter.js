import React, { Component } from 'react';
import '../Modules/counter.css';

export class Counter extends Component {
  formatCount = () =>
    this.props.counter.value === 0 ? 'Zero' : this.props.counter.value;

  render() {
    const resetBtnClassName =
      this.props.counter.value > 0 ? 'decrement' : 'decrement-negative';

    return (
      <div className='counter'>
        <span
          className={
            this.props.counter.value === 0 ? 'zeroCount' : 'formatCount'
          }
        >
          {this.formatCount()}
        </span>
        <button
          onClick={() => this.props.onIncrement(this.props.counter)}
          className='increment'
        >
          +
        </button>
        <button
          onClick={() => this.props.onDecrement(this.props.counter)}
          className={resetBtnClassName}
        >
          -
        </button>
        <button
          onClick={() => this.props.onDelete(this.props.counter.id)}
          className='delete'
        >
          X
        </button>
      </div>
    );
  }
}

export default Counter;
