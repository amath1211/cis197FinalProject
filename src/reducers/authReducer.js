import {
  LOGIN_FUL,
  LOGIN_REJ,
  LOGOUT_FUL,
  REGISTER_FUL,
  REGISTER_REJ,
} from '../actions/auth';

const auth = (initialState={ isAuthenticated: localStorage.getItem('token')  ? true : false }, action) => {
  switch(action.type) {
    case 'LOGIN_FUL':
      return { isAuthenticated: true }
    case 'REGISTER_FUL':
      return { isAuthenticated: true }
    case 'LOGOUT_FUL':
      return { isAuthenticated: false }
    case 'LOGIN_REJ':
      return { isAuthenticated: false }
    case 'REGISTER_REJ':
      return { isAuthenticated: false }
    default:
      return state
  }
}

export default auth;
