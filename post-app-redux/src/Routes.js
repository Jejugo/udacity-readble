import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from  './components/Home';
import Posts from  './components/Posts';
import PostPage from  './components/PostPage';
import { connect } from 'react-redux'
import { handleInitialData } from './redux/actions/shared';

class Routes extends Component {

  componentDidMount(){
    this.props.dispatch(handleInitialData());
  }


  render() {
    return (
      <Fragment>
        <Route exact path='/' component={Home}/>
        <Route path='/post/:id' render={(history) => (
            <PostPage {...history}></PostPage>
          )}/>
      </Fragment>
    );
  }
}

export default connect()(Routes);
