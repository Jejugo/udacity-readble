import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import axios from 'axios';
import getPostsByCategory from './redux/actions/posts';

it('gets the list of posts by category', () => {
  let category = 'react';
  axios.get(`http://localhost:3001/${category}/posts`, {headers:  { Authorization: 'Bearer teste'}})
  .then(response => {
    expect(response).toBe(typeof object);
  }).catch(error => {
    console.log('error: ', error);
  });
});
