import React, { Component } from 'react';
import './App.css';
import TickerChart from './TickerChart';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        Comparison of DJI and BSE Daily Index Close.
        </header>
        <TickerChart/>

      </div>
    );
  }
}

export default App;
