import axios from 'axios';
import shortid from 'shortid';

export const GET_COMMENT_POST = 'GET_COMMENT_POST';

const headers = {
  Authorization: 'Bearer teste'
}

function getCommentByPost(comments){
  return {
    type: GET_COMMENT_POST,
    comments
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
      //terminar a mudança na store!!
      console.log('success', response);
    }).catch(e => {
      console.log('erro', e);
    });
  }
}