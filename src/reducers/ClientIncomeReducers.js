import * as GlobalActions from '../actions/GlobalActions'
import * as ClientIncomeActions from '../actions/ClientIncomeActions'

export const clientIncomeReducers = (state = {
    documents: []
    
}, action) => {
    switch (action.type) {
        case ClientIncomeActions.CLIENT_FETCH_INCOME_DOCUMENTS_FULFILLED:
            return Object.assign({}, state, {
               documents: action.data
            })
        default:
            return {
                ...state
            }
    }
}
