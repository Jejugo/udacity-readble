import axios from 'axios';
import { todayDate } from '../../helpers/date';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const ADD_POSTS_BY_CATEGORY = 'ADD_POSTS_BY_CATEGORY';
export const ADD_POST = 'ADD_POST';
export const HANDLE_LIKE = 'HANDLE_LIKE';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST = 'UPDATE_POST'
export const ORDER_POST_BY_DATE = 'ORDER_POST_BY_DATE'
export const ORDER_POST_BY_SCORE = 'ORDER_POST_BY_SCORE'

const headers = {
  Authorization: 'Bearer teste'
}

//SINGLE FUNCTIONS

export function receivePosts (posts) {
  return {
    type: RECEIVE_POSTS,
    posts,
  }
}

function deletePost(id){
  return{
    type: DELETE_POST,
    id
  }
}

function addPost(post){
  return {
    type: ADD_POST,
    post
  }
}

function handleLike(id, post){
  return{
    type: HANDLE_LIKE,
    id,
    post
  }
}

function updatePost(post){
  return{
    type: UPDATE_POST,
    post
  }
}

export function orderPostByDate () {
  return {
    type: ORDER_POST_BY_DATE
  }
}

export function orderPostByScore () {
  return {
    type: ORDER_POST_BY_SCORE
  }
}

//THUNK FUNCTIONS

export function getAllPosts(){
  return (dispatch) => {
    axios.get(`http://localhost:3001/posts`, {headers:  headers})
    .then(response => {
      dispatch(receivePosts(response.data));
    }).catch(e => {
      console.log('error:  ' , e);
    });
  }
}

export function getPostsByCategory(category){
  return (dispatch) => {
    axios.get(`http://localhost:3001/${category}/posts`, {headers:  headers})
    .then(response => {
      dispatch(receivePosts(response.data));
    }).catch(error => {
      console.log('error: ', error);
    });
  }
}

export function addPostThunk(post){
  return (dispatch) => {
    axios.post(`http://localhost:3001/posts`, {id: post.id, title: post.title, timestamp: Date.now(), body: post.body, category: post.category, author: post.author}, {headers: headers})
    .then(response => {
      console.log('Thats the date', todayDate());
      console.log('successo!', response);
      dispatch(addPost(response.data));
    }).catch(e => {
      console.log('erro ', e);
    });
  }
}

export function handleLikeThunk(id, likeType){
  return (dispatch) => {
    axios.post(`http://localhost:3001/posts/${id}`, {option: likeType}, {headers: headers})
    .then(response => {
      console.log('success! ', response);
      dispatch(handleLike(id, response.data))
    }).catch(e => {
      console.log('error: ', e);
    });
  }
}

export function handleDeleteThunk(id){
  return (dispatch) => {
    axios.delete(`http://localhost:3001/posts/${id}`, {headers: headers})
    .then(response => {
      dispatch(deletePost(id));
    }).catch(e => {
      console.log('erro ', e);
    })
  }
}

export function updatePostThunk(post){
  return (dispatch) => {
    axios.put(`http://localhost:3001/posts/${post.id}`, {id: post.id, title: post.title, timestamp: Date.now(), body: post.body, category: post.category, author: post.author}, {headers: headers})
    .then(response => {
      dispatch(updatePost(response.data));
    }).catch(e => {
      console.log('erro ', e);
    });
  }
}

export function getPostByIdThunk(id){
  return (dispatch) => {
  axios.get(`http://localhost:3001/posts/${id}`, {headers:  {Authorization: 'Bearer teste'}})
    .then(response => {
      dispatch(updatePost(response.data));
    }).catch(e => { 
      console.log('error ', e);
    });
  }
}
