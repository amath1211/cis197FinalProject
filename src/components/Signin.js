import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../actions/auth';
import {withRouter} from 'react-router-dom';

class Signin extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.authenticated) {
      this.props.history.push('/feed');
    }
  }

  componentDidUpdate() {
    if (this.props.authenticated) {
      this.props.history.push('/feed');
    }
  }

  signin(e) {
    e.preventDefault();
    let {dispatch} = this.props;
    let username = this.refs.rusername.value;
    let password = this.refs.rpassword.value;
    let name = this.refs.name.value;
    let profilePicture = this.refs.profilePicture.value;
    dispatch(loginUser({
      username,
      password
    }));
  }

  render() {
    let { isAuthenticated, isFetching, messages } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={this.signin.bind(this)}>
              <div className="form-group">
                <label>
                  Username:
                </label>
                <input
                  className="form-control"
                  type="text"
                  ref="username"
                />
              </div>
              <div className="form-group">
                <label>
                  Password:
                </label>
                <input
                  className="form-control"
                  type="password"
                  ref="password"
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Sign In"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let { authReducer } = state;
  return authReducer;
}

export default withRouter(connect(mapStateToProps)(Signup));