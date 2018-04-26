import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default function requiresAuth(Component) {
  class AuthHOC extends React.Component {
    componentDidMount() {
      this.checkIfLoggedIn();
    }

    componentDidUpdate() {
      this.checkIfLoggedIn();
    }

    checkIfLoggedIn() {
      const { isAuthenticated } = this.props;
      if (!isAuthenticated) {
        this.props.rejectLogin();
        this.props.history.push('/signin');
      }
    }

    render() {
      return (
        <div>
          { this.props.isAuthenticated ? <Component {...this.props} /> : null }
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    // only look at  the auth reducer
    const { authReducer } = state;
    const { isAuthenticated } = authReducer;
    return {
      isAuthenticated,
    };
  };

  const mapDispatchToProps = dispatch => ({
    rejectLogin: () => dispatch({
      type: 'LOGIN_REJ',
      error: 'You are not authenticated',
    }),
  });

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthHOC));
}
