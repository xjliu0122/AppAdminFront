import Notifications from 'react-notification-system-redux';

export const ADD_LOADING_COUNT = "ADD_LOADING_COUNT"
export const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE"
export const REDUCE_LOADING_COUNT = "REDUCE_LOADING_COUNT"
export const ADD_SUB_LOADING_COUNT = "ADD_SUB_LOADING_COUNT"
export const REDUCE_SUB_LOADING_COUNT = "REDUCE_SUB_LOADING_COUNT"

export const CLOSE_POPUP_CONFIRMATION = "CLOSE_POPUP_CONFIRMATION"
export const OPEN_POPUP_CONFIRMATION = "OPEN_POPUP_CONFIRMATION"
export const SET_SELECTED_CLIENT = "SET_SELECTED_CLIENT"

export const addLoadingCount = () => {
    return {type: ADD_LOADING_COUNT}
}

export const reduceLoadingCount = () => {
    return {type: REDUCE_LOADING_COUNT}
}
export const addSubLoadingCount = () => {
    return {type: ADD_SUB_LOADING_COUNT}
}

export const reduceSubLoadingCount = () => {
    return {type: REDUCE_SUB_LOADING_COUNT}
}

let notificationOpts = {
    position: 'tr',
    autoDismiss: 0
}
export const openNotification = (msg, type, dispatch) => {
    let displayMsg = "Opps there was an unexpected error, please try again"
    switch (typeof msg) {
        case 'object':
            if (msg.response&&msg.response.data && msg.response.data !== '') {
                displayMsg = msg.response.data
            }
            break;
        case 'string':
            displayMsg = msg
            break;
        default:

    }
    notificationOpts.message = displayMsg /// should process this error.
    if (type === "success") {
        notificationOpts.title = "Success"
        notificationOpts.message = msg
        notificationOpts.autoDismiss = 5
        dispatch(Notifications.success(notificationOpts))
    } else {
        notificationOpts.title = "Error"
        notificationOpts.autoDismiss = 5
        dispatch(Notifications.error(notificationOpts))
    }
}

export const closePopupConfirmation = () => {
    return {type: CLOSE_POPUP_CONFIRMATION}
}
export const openPopupConfirmation = (options) => {
    return {type: OPEN_POPUP_CONFIRMATION, data: options}
}
export const setSelectedClient = (client) => {
    return {type: SET_SELECTED_CLIENT, data: client}

}