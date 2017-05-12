import React, { Component } from 'react';

class Files extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        Hello World Files 
      </div>
    )
  }
}

import {connect} from 'react-redux'
export default connect((store) => {
  return store
})(Files)