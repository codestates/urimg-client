import { combineReducers } from 'redux';
import userReducer from './userReducer';
import imageReducer from './imageReducer';

const rootReducer = combineReducers({
  userReducer,
  imageReducer
});

export default rootReducer;