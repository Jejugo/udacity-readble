import axios from 'axios';
import shortid from 'shortid';
import { todayDate } from '../../helpers/date';

export const GET_COMMENT_POST = 'GET_COMMENT_POST';
export const ADD_COMMENT_POST = 'ADD_COMMENT_POST';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const HANDLE_LIKE = 'HANDLE_LIKE';
export const ORDER_COMMENT_BY_DATE = 'ORDER_COMMENT_BY_DATE';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';

const headers = {
  Authorization: 'Bearer teste'
}

function getCommentByPost(comments){
  return {
    type: GET_COMMENT_POST,
    comments
  }
}

function updateComment(post){
  return{
    type: UPDATE_COMMENT,
    post
  }
}

function addCommentByPost(comment){
  return {
    type: ADD_COMMENT_POST,
    comment,
    parentId: comment.parentId
  }
}

function deleteComment(comment){
  return{
    type: DELETE_COMMENT,
    id: comment.id,
    parentId: comment.parentId
  }
}

function handleLike(id, post){
  return{
    type: HANDLE_LIKE,
    id,
    post
  }
}

export function orderCommentsByDate () {
  return {
    type: ORDER_COMMENT_BY_DATE
  }
}

export function getCommentsByPostThunk(id){
  return (dispatch) => {
    axios.get(`http://localhost:3001/posts/${id}/comments`, {headers: headers})
    .then(response => {
      dispatch(getCommentByPost(response.data));
    }).catch(e => {
    })
  }
}

export function addCommentByPostThunk(comment){
  return (dispatch) => {
    axios.post('http://localhost:3001/comments', {id: shortid.generate(), timestamp: Date.now(), body: comment.body, author: comment.author, parentId: comment.parentId}, {headers: headers})
    .then(response => {
      dispatch(addCommentByPost(response.data));
    }).catch(e => {
      console.log('erro', e);
    });
  }
}

export function updateCommentThunk(comment){
  return (dispatch) => {
    axios.put(`http://localhost:3001/comments/${comment.id}`, {id: comment.id, title: comment.title, timestamp: Date.now(), body: comment.body, category: comment.category, author: comment.author, parentId: comment.parentId}, {headers: headers})
    .then(response => {
      dispatch(updateComment(response.data));
    }).catch(e => {
      console.log('erro ', e);
    });
  }
}

export function handleDeleteCommentsThunk(comment){
  return (dispatch) => {
    axios.delete(`http://localhost:3001/comments/${comment.id}`, {headers: headers})
    .then(response => {
      dispatch(deleteComment(comment));
    }).catch(e => {
      console.log('erro ', e);
    })
  }
}

export function handleLikeCommentThunk(id, likeType){
  return (dispatch) => {
    axios.post(`http://localhost:3001/comments/${id}`, {option: likeType}, {headers: headers})
    .then(response => {
      console.log('success! ', response);
      dispatch(handleLike(id, response.data))
    }).catch(e => {
      console.log('erro!! ', e);
    });
  }
}
