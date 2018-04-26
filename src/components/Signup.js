import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../actions/auth';
import { withRouter } from 'react-router-dom';

class Signup extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.authenticated) {
      this.props.history.push("/feed")
    }
  }

  componentDidUpdate() {
    if (this.props.authenticated) {
      this.props.history.push("/feed")
    }
  }

  signup(e) {
    e.preventDefault();
    let { dispatch } = this.props;
    let username = this.refs.rusername.value;
    let password = this.refs.rpassword.value;
    let name = this.refs.name.value;
    let profilePicture = this.refs.profilePicture.value;
    dispatch(registerUser({
      username,
      password,
      name,
      profilePicture
    }));
  }

  render() {
    let { isAuthenticated, isFetching, messages } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={this.signup.bind(this)}>
              <div className="form-group">
                <label>
                  Username:
                </label>
                <input
                  className="form-control"
                  type="text"
                  ref="rusername"
                />
              </div>
              <div className="form-group">
                <label>
                  Password:
                </label>
                <input
                  className="form-control"
                  type="password"
                  ref="rpassword"
                />
              </div>
              <div className="form-group">
                <label>
                  Name:
                </label>
                <input
                  className="form-control"
                  type="text"
                  ref="name"
                />
              </div>
              <div className="form-group">
                <label>
                  Species:
                </label>
                <input
                  className="form-control"
                  type="text"
                  ref="species"
                />
              </div>
              <div className="form-group">
                <label>
                  Image:
                </label>
                <input
                  className="form-control"
                  type="text"
                  ref="photo"
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Sign Up"
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
