import React, { Component } from 'react';

class Reporting extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        Hello World reporting 
      </div>
    )
  }
}

import {connect} from 'react-redux'
export default connect((store) => {
  return store
})(Reporting)