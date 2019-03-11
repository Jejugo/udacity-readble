import { GET_COMMENT_POST, ADD_COMMENT_POST, DELETE_COMMENT, HANDLE_LIKE, ORDER_COMMENT_BY_DATE, UPDATE_COMMENT } from  '../actions/comments';

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
    case UPDATE_COMMENT:
      if(state.find((post) => post.id === action.post.id)){
        return state.map(post => {
          return post.id === action.post.id ? action.post : post
        });
      } 
      else{
       return [...state, action.post];
       }
    case ORDER_COMMENT_BY_DATE :
      return state.slice().sort((a,b) => b.timestamp - a.timestamp)

    default:
      return state;
  }
}
