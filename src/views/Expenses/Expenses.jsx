import React, { Component } from 'react';

class Expenses extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        Hello World Expenses 
      </div>
    )
  }
}

import {connect} from 'react-redux'
export default connect((store) => {
  return store
})(Expenses)