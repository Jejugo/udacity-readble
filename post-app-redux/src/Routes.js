import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from  './components/Home';
import Posts from  './components/Posts';
import Post from  './components/Post';
import { connect } from 'react-redux'
import { handleInitialData } from './redux/actions/shared';

class Routes extends Component {

  componentDidMount(){
    this.props.dispatch(handleInitialData());
  }


  render() {
    return (
      <div className="Routes">
          <Route exact path='/' component={Home}></Route>
          <Route path='/posts' component={Posts}></Route>
          <Route path='/post/:id' render={(history) => (
            <Post {...history}></Post>
          )}></Route>
      </div>
    );
  }
}

export default connect()(Routes);
