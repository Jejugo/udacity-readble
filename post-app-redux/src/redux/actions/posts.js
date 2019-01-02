import axios from 'axios';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const ADD_POSTS_BY_CATEGORY = 'ADD_POSTS_BY_CATEGORY';

export function receivePosts (posts) {
  return {
    type: RECEIVE_POSTS,
    posts,
  }
}

export function addPostsByCategory(posts){
  return {
    type: ADD_POSTS_BY_CATEGORY,
    posts
  }
}
export function getPostsByCategory(category){
  return (dispatch) => {
    axios.get(`http://localhost:3001/${category}/posts`, {headers:  { Authorization: 'Bearer teste'}})
    .then(response => {
      dispatch(addPostsByCategory(response.data));
    }).catch(error => {
      console.log('error: ', error);
    });
  }
}