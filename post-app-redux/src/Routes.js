import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Home from  './components/Home';
import PostPage from  './components/PostPage';

class Routes extends Component {

  render() {
    return (
      <Fragment>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/post/:id' render={(history) => (
                <PostPage {...history}/>
              )}/>
          </Switch>
        </BrowserRouter>
      </Fragment>
    );
  }
}

export default Routes;
