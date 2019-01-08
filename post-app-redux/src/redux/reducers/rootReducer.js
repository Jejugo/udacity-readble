import { combineReducers } from 'redux';
import posts from './posts';
import categories from './categories';
import comments from './comments';

const rootReducer = combineReducers({
  posts: posts,
  comments: comments,
  categories: categories
});

export default rootReducer;