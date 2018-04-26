export const LOGIN_FUL = 'LOGIN_FUL';
export const LOGIN_REJ = 'LOGIN_REJ';

export const REGISTER_FUL = 'REGISTER_FUL';
export const REGISTER_REJ = 'REGISTER_REJ';

export const LOGOUT_FUL = 'LOGOUT_FUL';


function receiveLogin(token) {
  return {
    type: LOGIN_FUL,
    token: token,
    message: 'You have logged in successfully',
  };
}


function loginError(message) {
  return {
    type: LOGIN_REJ,
    error: message,
  };
}


function registerSuccess(token) {
  return {
    type: REGISTER_FUL,
    token: token,
    message: 'You have registered and are now logged in',
  };
}


function registerError(message) {
  return {
    type: REGISTER_REJ,
    error: message,
  };
}


export function logOut() {
  localStorage.removeItem('token');
  return {
    type: LOGOUT_FUL,
    isFetching: false,
    isAuthenticated: false,
    message: 'You have logged out',
  };
}


export function loginUser(creds) {
  let config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(creds),
  };
  return dispatch => fetch('/account/signin', config)
    .then(response => response.json())
    .then((res) => {
      if (!res.success) {
        return Promise.reject(res.message);
      } else {
        localStorage.setItem('token', res.token);
        // tell our store that login has been done
        dispatch(receiveLogin(res.token));
      }
    })
    .catch(err => dispatch(loginError(err)));
}


export function registerUser(info) {
  let config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(info),
  };
  return dispatch => fetch('/account/signup', config)
    .then(response => response.json())
    .then((res) => {
      if (!res.success) {
        dispatch(registerError(res.message));
        return Promise.reject(res.message);
      } else {
        localStorage.setItem('token', res.token);
        dispatch(registerSuccess(res.token));
      }
    })
    .catch(err => dispatch(registerError(err)));
}

