import * as GlobalActions from '../actions/GlobalActions'
import * as ClientCOAActions from '../actions/ClientCOAActions'

export const clientCOAReducers = (state = {
    accounts: [],
    currentCOAId: '',
    currentCOARecords: [],
    currentCOARecordsWip: []
}, action) => {
    switch (action.type) {
        case ClientCOAActions.CLIENT_FETCH_COA_DATA_FULFILLED:
            return Object.assign({}, state, {accounts: action.data})
        case ClientCOAActions.CLIENT_FETCH_GLRECORDS_FULFILLED:
            return Object.assign({}, state, {
                currentCOAId: action.data.coaId,
                currentCOARecords: action.data.records,
                currentCOARecordsWip: [...action.data.records]
            })
        case ClientCOAActions.CLIENT_SET_COA_RECORDS_WIP:
            return Object.assign({}, state, {currentCOARecordsWip: action.data})
        case ClientCOAActions.CLIENT_CLEAR_COA_RECORDS:
            return Object.assign({}, state, {
                currentCOARecordsWip: [],
                currentCOAId: '',
                currentCOARecords: []
            })
        default:
            return {
                ...state
            }
    }
}
