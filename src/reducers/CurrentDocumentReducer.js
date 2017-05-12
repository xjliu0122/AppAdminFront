import * as GlobalActions from '../actions/GlobalActions'
import * as CurrentDocumentActions from '../actions/CurrentDocumentActions'

export const currentDocumentReducer = (state = {
    doc:{picData:'/img/placeholder.jpg'}
}, action) => {
    switch (action.type) {
        case CurrentDocumentActions.CLIENT_SET_CURRENT_OPENED_DOC_FULFILLED:
            return Object.assign({}, state, {
            doc: action.data
        })
        case CurrentDocumentActions.CLIENT_SET_NEW_TRANSACTION_DATA_FOR_OPENED_DOC_FULFILLED:
            let newObj = Object.assign({}, state)
            newObj.doc.bankTransactions = action.data
            return newObj
        default:
            return {
                ...state
            }
    }
}
