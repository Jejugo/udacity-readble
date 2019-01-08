import { GET_COMMENT_POST } from  '../actions/comments';

const initialState = [

];

export default function comments(state = initialState, action){
  switch(action.type){
    case GET_COMMENT_POST:
      return action.comments
    default: 
      return state;
  }
}
