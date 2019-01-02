import axios from 'axios';
import { receivePosts } from './posts';
import { receiveCategories } from './categories';

export function handleInitialData(){
  return (dispatch) => {
    axios.all([
      axios.get('http://localhost:3001/posts', {headers:  { Authorization: 'Bearer teste'}}),
      axios.get('http://localhost:3001/categories', {headers:  { Authorization: 'Bearer teste'}})])
    .then(axios.spread((posts, categories) => {
      dispatch(receivePosts(posts.data));
      dispatch(receiveCategories(categories.data.categories));
      console.log('despachou');
    })).catch(error => {
      console.log('error: ', error);
    })
  }
}