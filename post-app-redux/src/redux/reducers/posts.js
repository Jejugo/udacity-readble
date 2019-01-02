import { RECEIVE_POSTS } from  '../actions/posts';
import { ADD_POSTS_BY_CATEGORY } from '../actions/posts';

const initialState = [

];

export default function posts(state = initialState, action){
  switch(action.type){
    case RECEIVE_POSTS:
      return [
        ...state,
        ...action.posts
      ]
    case ADD_POSTS_BY_CATEGORY:
      return [
        ...action.posts
      ]
    default: 
      return state;
  }
}
