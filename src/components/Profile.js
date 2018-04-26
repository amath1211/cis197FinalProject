import React, {Component} from 'react';
import Timeline from './Timeline';
import UploadImage from './UploadImage';
import {connect} from 'react-redux';

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="container">
        <div className="col-md-8">
          {this.props.match.params.id ? <UploadImage/> : null }
          <Timeline/>
          }
        </div>
      </div>
    );
  }
}