import * as ClientSettingActions from '../actions/ClientSettingActions'

export const clientSettingReducers = (state = {
    templates: [],
    templateSelection: '',
    wipTemplate:[]
}, action) => {
    switch (action.type) {
        case ClientSettingActions.CLIENT_FETCH_TEMPLATE_FULFILLED:
            return Object.assign({}, state, {templates: action.data})
        case ClientSettingActions.CLIENT_SET_TEMPLATE_SELECTION:
            return Object.assign({}, state, {templateSelection: action.data})
        case ClientSettingActions.CLIENT_SET_WIP_ACCOUNTS:
            return Object.assign({}, state, {wipAccounts: action.data})
        default:
            return {
                ...state
            }
    }
}