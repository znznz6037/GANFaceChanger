import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      title: null
    }
  }

  componentDidMount() {
    fetch('http://localhost:3001/api')
      .then(res => res.json())
      .then(data => this.setState({title: data.title}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            {this.state.title? <h1>{this.state.title}</h1>:<h1>loading...</h1>}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
