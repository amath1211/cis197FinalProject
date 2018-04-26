import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
      return (
      <nav class="navbar navbar-inverse">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="#">Memer</a>
          </div>
          {this.props.isAuthenticated ?
            (
              <ul className="nav navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/timeline">
                    Timeline
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </ul>
          )}
        </div>
      </nav>
  )};
}

const mapStateToProps = (state) => {
  let { authReducer } = state;
  return authReducer;
};

export default connect(mapStateToProps, null)(NavBar);