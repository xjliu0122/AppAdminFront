import * as GlobalActions from '../actions/GlobalActions'

export const globalReducer = (state = {
    loading: 0,
    subLoading: 0,
    popupConfirm: {},
    selectedClient:{}
}, action) => {
    switch (action.type) {
        case GlobalActions.ADD_LOADING_COUNT:
            return Object.assign({}, state, {
                loading: state.loading + 1
            })
        case GlobalActions.REDUCE_LOADING_COUNT:
            return Object.assign({}, state, {
                loading: state.loading - 1
            })
        case GlobalActions.ADD_SUB_LOADING_COUNT:
            return Object.assign({}, state, {
                subLoading: state.subLoading + 1
            })
        case GlobalActions.REDUCE_SUB_LOADING_COUNT:
            return Object.assign({}, state, {
                subLoading: state.subLoading - 1
            })

        case GlobalActions.OPEN_POPUP_CONFIRMATION:
            return Object.assign({}, state, {popupConfirm: action.data})
        case GlobalActions.CLOSE_POPUP_CONFIRMATION:
            return Object.assign({}, state, {popupConfirm: {}})
        case GlobalActions.SET_SELECTED_CLIENT:
            return Object.assign({}, state, {selectedClient: action.data})
        default:
            return {
                ...state
            }
    }
}
