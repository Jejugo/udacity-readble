import React, { Component } from 'react';
import Routes from './Routes';
import { connect } from 'react-redux'
import { handleInitialData } from './redux/actions/shared';

class App extends Component {

  componentDidMount(){
    this.props.dispatch(handleInitialData());
  } 


  render() {
    return (
      <Routes></Routes>
    );
  }
}

export default connect()(App);
