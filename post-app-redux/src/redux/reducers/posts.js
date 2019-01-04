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
        post.id === action.id ? Object.assign(post, {voteScore: action.post.voteScore}) : post
      ));
      return handleLike;

    case DELETE_POST:
        return [
          ...state.filter(item => item.id !== action.id)
        ]
    case UPDATE_POST:
        let updatePost = state.map(post => (
          post.id === action.post.id ? Object.assign(post, {title: action.post.title, author: action.post.author, category: action.post.category, body: action.post.body}) : post
        ));
        return updatePost;

    default: 
      return state;
  }
}
