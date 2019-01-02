import { RECEIVE_CATEGORIES } from  '../actions/categories';

const initialState = [

];

export default function posts(state = initialState, action){
  switch(action.type){
    case RECEIVE_CATEGORIES:
      return [
        ...state,
        ...action.categories
      ]
    default: 
      return state;
  }
}
