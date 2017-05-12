import * as GlobalSettingActions from '../actions/GlobalSettingActions'

export const globalSettingReducers = (state = {
    templates: [],
    templateSelection: '',
    wipTemplate:[]
}, action) => {
    switch (action.type) {
        case GlobalSettingActions.FETCH_TEMPLATE_FULFILLED:
            return Object.assign({}, state, {templates: action.data})
        case GlobalSettingActions.SET_TEMPLATE_SELECTION:
            return Object.assign({}, state, {templateSelection: action.data})
        case GlobalSettingActions.SET_WIP_TEMPLATE:
            return Object.assign({}, state, {wipTemplate: action.data})
        default:
            return {
                ...state
            }
    }
}