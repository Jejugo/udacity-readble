import { combineReducers } from 'redux';
import posts from './posts';
import categories from './categories';

const rootReducer = combineReducers({
  posts: posts,
  categories: categories
});

export default rootReducer;