import React from 'react';
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
  }y

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
      </div>
    );
  }
}

export default App;