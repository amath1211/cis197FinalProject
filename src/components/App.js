import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import Signin from './Signin';
import Signup from './Signup';
import Logout from './Logout';
// import Timeline from './Timeline';
// import NavBar from './NavBar';
// import Profile from './Profile';
import AuthHOC from './AuthHOC';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <Route component={NavBar}/>
        <Switch>
          <Route path="/signin" component={Signin}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/logout" component={AuthHOC(Logout)}/>
          <Route path="/timeline" component={Timeline}/>
          <Route path="/profile/:id?" component={AuthHOC(Profile)}/>
          <Route component={Signin}/>
        </Switch>
      </div>
    )
  }
}

export default App;