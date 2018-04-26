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
      return this.setState({isAuthenticated: true});
    case 'REGISTER_FUL':
      return this.setState({isAuthenticated: true});
    case 'LOGOUT_FUL':
      return this.setState({isAuthenticated: false});
    case 'LOGIN_REJ':
      return this.setState({isAuthenticated: false});
    case 'REGISTER_REJ':
      return this.setState({isAuthenticated: false});
    default:
      return state
  }
}

export default auth;
