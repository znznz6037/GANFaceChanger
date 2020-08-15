import React, { Component } from 'react';
import FaceChange from './FaceChangeMain';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Menu from './Menu'

class App extends Component{
  render() {
    return (
        <div className="App">
          <Menu/>
        </div>   
    );
  }
}

export default App;