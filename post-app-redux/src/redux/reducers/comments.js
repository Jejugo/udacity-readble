import { GET_COMMENT_POST, ADD_COMMENT_POST, DELETE_COMMENT, HANDLE_LIKE, ORDER_COMMENT_BY_DATE } from  '../actions/comments';

const initialState = [

];

export default function comments(state = initialState, action){
  switch(action.type){
    case GET_COMMENT_POST:
      return action.comments
    case HANDLE_LIKE:
      let handleLike = state.map(post => (
        post.id === action.id ? action.post : post
      ));
      return handleLike;
    case ADD_COMMENT_POST:
      return [
        ...state,
        action.comment
      ]
    case DELETE_COMMENT:
      return [
        ...state.filter(item => item.id !== action.id)
      ]

    case ORDER_COMMENT_BY_DATE :
      return state.slice().sort((a,b) => b.timestamp - a.timestamp)

    default:
      return state;
  }
}
