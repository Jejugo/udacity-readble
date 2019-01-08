import { RECEIVE_POSTS, DELETE_POST, ADD_POST, HANDLE_LIKE, UPDATE_POST } from  '../actions/posts';

const initialState = [

];

export default function posts(state = initialState, action){
  switch(action.type){
    case RECEIVE_POSTS:
      return [
        ...action.posts
      ]
    case ADD_POST:
      return [
        ...state,
        action.post
      ]
    case HANDLE_LIKE:
      let handleLike = state.map(post => (
        post.id === action.id ? action.post : post
      ));
      return handleLike;

    case DELETE_POST:
        return [
          ...state.filter(item => item.id !== action.id)
        ]
    case UPDATE_POST:
      if(state.find((post) => post.id === action.post.id)){
        return state.map(post => {
          return post.id === action.post.id ? action.post : post
        });
      } 
      else{
       return [...state, action.post];
       }


    default: 
      return state;
  }
}
