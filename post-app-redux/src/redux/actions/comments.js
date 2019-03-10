import axios from 'axios';
import shortid from 'shortid';
import { todayDate } from '../../helpers/date';

export const GET_COMMENT_POST = 'GET_COMMENT_POST';
export const ADD_COMMENT_POST = 'ADD_COMMENT_POST';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const HANDLE_LIKE = 'HANDLE_LIKE';

const headers = {
  Authorization: 'Bearer teste'
}

function getCommentByPost(comments){
  return {
    type: GET_COMMENT_POST,
    comments
  }
}

function addCommentByPost(comment){
  return {
    type: ADD_COMMENT_POST,
    comment
  }
}

function deleteComment(id){
  return{
    type: DELETE_COMMENT,
    id
  }
}

function handleLike(id, post){
  return{
    type: HANDLE_LIKE,
    id,
    post
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
    axios.post('http://localhost:3001/comments', {id: shortid.generate(), timestamp: todayDate(), body: comment.body, author: comment.author, parentId: comment.parentId}, {headers: headers})
    .then(response => {
      dispatch(addCommentByPost(response.data));
    }).catch(e => {
      console.log('erro', e);
    });
  }
}

export function handleDeleteCommentsThunk(id){
  return (dispatch) => {
    axios.delete(`http://localhost:3001/comments/${id}`, {headers: headers})
    .then(response => {
      dispatch(deleteComment(id));
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