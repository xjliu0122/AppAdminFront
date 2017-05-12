import React, {Component,PropTypes} from 'react'

import Notifications from 'react-notification-system-redux';

class Notification extends Component {
    render() {
        const {notifications} = this.props;
        const style = {
            NotificationItem: { // Override the notification item
                DefaultStyle: { // Applied to every notification, regardless of the notification level
                    margin: '10px 5px 2px 1px'
                },

                success: { // Applied only to the success notification item
                    color: 'green'
                }
            }
        };
        return (<Notifications notifications={notifications} style={style}/>)
    }
}


import {connect} from 'react-redux'
Notification.contextTypes = {
  store: PropTypes.object
};

Notification.propTypes = {
  notifications: PropTypes.array
};

export default connect(
  state => ({ notifications: state.notifications })
)(Notification);
