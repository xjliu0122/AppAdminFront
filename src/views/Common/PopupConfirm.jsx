import React, {PropTypes} from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import * as GlobalActions from '../../actions/GlobalActions'

class PopupConfirm extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.handleOK = this
      .handleOK
      .bind(this)
    this.handleCancel = this
      .handleCancel
      .bind(this)

  }
  handleOK() {
    this
      .props
      .dispatch(GlobalActions.closePopupConfirmation());
    if (this.proceed) 
      this.proceed()

  }
  handleCancel() {
    this
      .props
      .dispatch(GlobalActions.closePopupConfirmation())
  }
  render() {

    this.confirmation = this.props.global.popupConfirm.confirmation
    this.show = this.props.global.popupConfirm.show
    this.proceed = this.props.global.popupConfirm.proceed
    return (

      <div>
        {this.props.global.popupConfirm.show && <ModalContainer>
          <ModalDialog>

            <div className="confirmation-body-txt">
              {this.confirmation}
            </div>
            <hr/>
            <button className="btn btn-primary btn-sm" onClick={this.handleOK}>
              OK
            </button>
            <button className="btn btn-warning btn-sm" onClick={this.handleCancel}>
              Cancel
            </button>
          </ModalDialog>
        </ModalContainer>
}
      </div>
    )

  }
}

import {connect} from 'react-redux'
export default connect((store) => {
  return store
})(PopupConfirm)