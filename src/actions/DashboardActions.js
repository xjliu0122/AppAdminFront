import * as CommonServices from './CommonServices';
import * as GlobalActions from './GlobalActions';


export const FETCH_KPI_FULFILLED = "FETCH_KPI_FULFILLED"
export const FETCH_MESSAGE_FULFILLED = "FETCH_MESSAGE_FULFILLED"
export const FETCH_REMINDAR_FULFILLED = "FETCH_REMINDAR_FULFILLED"


export const fetchKPIFulfilled = (data) => {
    return {type: FETCH_KPI_FULFILLED, payload: data}
};

export const fetchMessageFulfilled = (user) => {
    return {type: FETCH_MESSAGE_FULFILLED, user}
};

export const fetchRemindarFulfilled = (user) => { 
    return {type: FETCH_REMINDAR_FULFILLED, user}
};

export const fetchKPI = (props) => {
  
    props.dispatch(GlobalActions.addLoadingCount());
    CommonServices
        .http()
        .get('KPI')
        .then((response) => {
            props.dispatch(GlobalActions.reduceLoadingCount());
            props.dispatch(fetchKPIFulfilled(response.data))
        })
        .catch((err) => {
            props.dispatch(GlobalActions.reduceLoadingCount());
            GlobalActions.openNotification(err,"error",props.dispatch)
        });
}

export const fetchMessage = (props) => {
  
    props.dispatch(GlobalActions.addLoadingCount());
    CommonServices
        .http()
        .get('messages')
        .then((response) => {
            props.dispatch(GlobalActions.reduceLoadingCount());
            props.dispatch(fetchMessageFulfilled(response.data))
        })
        .catch((err) => {
            props.dispatch(GlobalActions.reduceLoadingCount());
            GlobalActions.openNotification(err,"error",props.dispatch )
        });
}

export const fetchRemindar = (props) => {
    
    props.dispatch(GlobalActions.addLoadingCount());
    CommonServices
        .http()
        .get('remindars')
        .then((response) => {
            props.dispatch(GlobalActions.reduceLoadingCount());
            props.dispatch(fetchRemindarFulfilled(response.data))
        })
        .catch((err) => {            
            props.dispatch(GlobalActions.reduceLoadingCount());
            GlobalActions.openNotification(err,"error",props.dispatch )
        });
}

