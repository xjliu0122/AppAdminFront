import * as CommonServices from './CommonServices'
import * as GlobalActions from './GlobalActions'


export const CLIENT_FETCH_INCOME_DOCUMENTS_FULFILLED = "CLIENT_FETCH_INCOME_DOCUMENTS_FULFILLED"

export const fetchIncomeDocumentsFulfilled = (documents) => {
    return {type: CLIENT_FETCH_INCOME_DOCUMENTS_FULFILLED, data: documents}
}

export const handleFetchIncomeDocuments = (props) => {
    if (props.global.selectedClient.uid) {
        props.dispatch(GlobalActions.addLoadingCount());
        CommonServices
            .http()
            .get('clientdocuments/income/' + props.global.selectedClient.uid)
            .then((response) => {
                props.dispatch(GlobalActions.reduceLoadingCount());
                props.dispatch(fetchIncomeDocumentsFulfilled(response.data.result))
            })
            .catch((err) => {
                props.dispatch(GlobalActions.reduceLoadingCount());
                GlobalActions.openNotification(err, "error", props.dispatch)
            });
    }else{
        GlobalActions.openNotification("Please select a client.", "error", props.dispatch)
    }
}

