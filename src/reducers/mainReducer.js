import {combineReducers} from 'redux';
import authReducer from './authReducer';
// import timelineReducer from './timelineReducer';
// import imageReducer from './imageReducer';
// import profileReducer from './profileReducer';
// import commentReducer from './commentReducer';

var imageApp = combineReducers ({
  authReducer: authReducer,
  // timelineReducer: timelineReducer,
  // imageReducer: imageReducer,
  // profileReducer: profileReducer,
  // commentReducer: commentReducer
});

export default imageApp;