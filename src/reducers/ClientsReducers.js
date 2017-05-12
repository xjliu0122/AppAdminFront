import * as ClientsActions from '../actions/ClientsActions'

export const clientsReducers = (state = {
    clients:[]
}, action) => {
    switch (action.type) {
        case ClientsActions.CLIENT_FETCH_CLIENTS_FULFILLED:
            return Object.assign({}, state, {clients: action.data})

        default:
            return {
                ...state
            }
    }
}