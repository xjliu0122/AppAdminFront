import React, {Component} from 'react';

class PendingDocuments extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        Hello World3
      </div>
    )
  }
}

import {connect} from 'react-redux'
export default connect((store) => {
  return store
})(PendingDocuments)