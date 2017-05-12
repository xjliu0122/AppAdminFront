import * as CommonServices from './CommonServices'
import * as GlobalActions from './GlobalActions'

export const CLIENT_FETCH_TEMPLATE_FULFILLED = "CLIENT_FETCH_TEMPLATE_FULFILLED"
export const CLIENT_SET_TEMPLATE_SELECTION = "CLIENT_SET_TEMPLATE_SELECTION"
export const CLIENT_SET_WIP_ACCOUNTS = "CLIENT_SET_WIP_ACCOUNTS"

export const fetchTemplateFulfilled = (template) => {
    return {type: CLIENT_FETCH_TEMPLATE_FULFILLED, data: template}
}
export const setTemplateSelectionAction = (value) => {
    return {type: CLIENT_SET_TEMPLATE_SELECTION, data: value}
}
export const setWipAccountsAction = (value) => {
    return {type: CLIENT_SET_WIP_ACCOUNTS, data: value}
}
export const fetchTemplate = (props) => {

    props.dispatch(GlobalActions.addLoadingCount());
    CommonServices
        .http()
        .get('availabletemplates')
        .then((response) => {
            props.dispatch(GlobalActions.reduceLoadingCount());
            props.dispatch(fetchTemplateFulfilled(response.data.result))
        })
        .catch((err) => {
            props.dispatch(GlobalActions.reduceLoadingCount());
            GlobalActions.openNotification(err, "error", props.dispatch)
        });
}

export const setTemplateSelection = (value, props) => {
    if (value && value != '') 
        props.dispatch(setTemplateSelectionAction(value))

}
export const setWipAccounts = (value, props) => {
    props.dispatch(setWipAccountsAction(value))
}
export const handleSaveAccounts = (props) => {
    let f = () => {
        props.dispatch(GlobalActions.addLoadingCount());
        CommonServices
            .http()
            .post('clientcoa', {
                clientUid: props.global.selectedClient.uid,
                data: props.clientSetting.wipAccounts
            })
            .then((response) => {
                props.dispatch(GlobalActions.reduceLoadingCount());
                GlobalActions.openNotification("Client chart of accounts saved successfully", "success", props.dispatch)
            })
            .catch((err) => {
                props.dispatch(GlobalActions.reduceLoadingCount());
                GlobalActions.openNotification(err, "error", props.dispatch)
            });
    }
    let options = {
        confirmation: 'Are you sure to save the chart of accounts?',
        show: true,
        proceed: f
    }
    if (props.global.selectedClient.uid) {
        props.dispatch(GlobalActions.openPopupConfirmation(options))
    }else{
        GlobalActions.openNotification("Please select a client.", "error", props.dispatch)
    }

    
}

