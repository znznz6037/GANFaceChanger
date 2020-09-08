import React, { Component } from 'react';
import Menu from './Menu';
import { withRouter } from 'react-router-dom';

class App extends Component{
  render() {
    return (
        <div className="App">
          <Menu/>
        </div>   
    );
  }
}

export default withRouter(App);