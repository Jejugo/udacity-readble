import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Home from  './components/Home';
import PostPage from  './components/PostPage';
import Page404 from './components/Page404';

class Routes extends Component {

  render() {
    return (
      <Fragment>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/error' component={Page404}></Route>
            <Route path='/:category/:id' render={(history) => (
                <PostPage {...history}/>
              )}/>
            <Route path='/:category' render={(history) => (
                <Home {...history}/>
              )}/>
          </Switch>
        </BrowserRouter>
      </Fragment>
    );
  }
}

export default Routes;
