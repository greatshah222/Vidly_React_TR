import React, { Component } from 'react';
import './App.css';
import Movies from './components/Movies';
// import Counters from './components/Counters';
import NavBar from './components/NavBar';

class App extends Component {
  state = {
    counters: [
      {
        id: 1,
        value: 0,
      },
      {
        id: 2,
        value: 2,
      },
      {
        id: 3,
        value: 3,
      },
      {
        id: 4,
        value: 4,
      },
    ],
  };
  // constructor(props) {
  //   super(props);

  //   // console.log('App-Constructor', this.props);
  //   // u have to call the state directly here like this.state= this.props.something;
  //   // not like this.setState({})
  //   // also define props in the constructor if u want to use props
  // }

  componentDidMount() {
    // can do ajax calls and here u have to do this.setState
    // console.log('App-Component did mount');
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log('prevProps', prevProps);
    // console.log('prevState', prevState);
    // we can do ajax call here saying if the state is updated then do ajax call and similar operation
    // it has both the prevState and the prevProps React use the prevState and props to check the old Dom with new virtual dom and only update whatever is required
  }
  componentWillUnmount() {
    console.log('counter unmount');
    // will be called when we remove or delete the dom
  }

  handleIncrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ counters: counters });
  };
  handleDelete = (counterId) => {
    console.log(counterId);
    const counters = this.state.counters.filter(
      (counter) => counter.id !== counterId
    );
    this.setState({
      counters: counters,
    });
  };
  handleReset = () => {
    const counters = this.state.counters.map((counter) => (counter.value = 0));
    this.setState(counters);
  };
  handleDecrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    if (counters[index].value > 0) {
      counters[index].value--;
      this.setState({
        counters: counters,
      });
    }

    //console.log(counter);
  };
  render() {
    return (
      <div className='App'>
        <NavBar numItem={this.state.counters.length} />
        {/* <Counters
          counters={this.state.counters}
          onIncrement={this.handleIncrement}
          onDecrement={this.handleDecrement}
          onDelete={this.handleDelete}
          onReset={this.handleReset}
        /> */}

        <Movies />
      </div>
    );
  }
}

export default App;
