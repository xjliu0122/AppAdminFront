import * as CommonServices from './CommonServices'
import * as GlobalActions from './GlobalActions'

export const CLIENT_FETCH_CLIENTS_FULFILLED = "CLIENT_FETCH_TEMPLATE_FULFILLED"

export const fetchClientsFulfilled = (clients) => {
    return {type: CLIENT_FETCH_CLIENTS_FULFILLED, data: clients}
}
export const fetchClients = (props) => {

    props.dispatch(GlobalActions.addLoadingCount());
    CommonServices
        .http()
        .get('clients')
        .then((response) => {            
            props.dispatch(fetchClientsFulfilled(response.data))
            props.dispatch(GlobalActions.reduceLoadingCount());
        })
        .catch((err) => {
            props.dispatch(GlobalActions.reduceLoadingCount());
            GlobalActions.openNotification(err, "error", props.dispatch)
        });
}
export const setSelectedClient = (uid, props) => {
    let selectedClient = props.clients.clients.filter((client)=>{
        return client.uid === uid
    })
    props.dispatch(GlobalActions.setSelectedClient(selectedClient[0]));
}

