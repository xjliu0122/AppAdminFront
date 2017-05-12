import * as CommonServices from './CommonServices'
import * as GlobalActions from './GlobalActions'

export const CLIENT_FETCH_COA_DATA_FULFILLED = "CLIENT_FETCH_COA_DATA_FULFILLED"
export const CLIENT_FETCH_GLRECORDS_FULFILLED = "CLIENT_FETCH_GLRECORDS_FULFILLED"
export const CLIENT_SET_COA_RECORDS_WIP = "CLIENT_SET_COA_RECORDS_WIP"
export const CLIENT_CLEAR_COA_RECORDS = "CLIENT_CLEAR_COA_RECORDS"

export const fetchClientCOADataFulfilled = (accounts) => {
    return {type: CLIENT_FETCH_COA_DATA_FULFILLED, data: accounts}
}
export const fetchGLRecordsForAccountFulfilled = (records) => {
    return {type: CLIENT_FETCH_GLRECORDS_FULFILLED, data: records}
}
export const setCoaRecordsWipAction = (value) => {
    return {type: CLIENT_SET_COA_RECORDS_WIP, data: value}
}
export const clearCurrentCoaRecordsAction = () => {
    return {type: CLIENT_CLEAR_COA_RECORDS}
}

export const setCoaRecordsWip = (value, props) => {
    props.dispatch(setCoaRecordsWipAction(value))
}
export const clearCurrentCoaRecords = (props) => {
    props.dispatch(clearCurrentCoaRecordsAction())
}
export const handleFetchCOAData = (props) => {
    if (props.global.selectedClient.uid) {
        props.dispatch(GlobalActions.addLoadingCount());
        CommonServices
            .http()
            .get('clientcoa/' + props.global.selectedClient.uid)
            .then((response) => {
                props.dispatch(GlobalActions.reduceLoadingCount());
                props.dispatch(fetchClientCOADataFulfilled(response.data))
            })
            .catch((err) => {
                props.dispatch(GlobalActions.reduceLoadingCount());
                GlobalActions.openNotification(err, "error", props.dispatch)
            });
    } else {
        GlobalActions.openNotification("Please select a client.", "error", props.dispatch)
    }
}

export const handleFetchGLRecordsForAccount = (doc, props) => {
    props.dispatch(clearCurrentCoaRecordsAction())
    
    if (props.global.selectedClient.uid) {
        props.dispatch(GlobalActions.addSubLoadingCount());
        CommonServices
            .http()
            .post('glrecords',
             {
                accountid:doc.guid,
                fromDate:'20170101',
                toDate:'20171231'
             })
            .then((response) => {
                props.dispatch(GlobalActions.reduceSubLoadingCount());
                props.dispatch(fetchGLRecordsForAccountFulfilled({records:response.data,coaId:doc.guid}))
            })
            .catch((err) => {
                props.dispatch(GlobalActions.reduceSubLoadingCount());
                GlobalActions.openNotification(err, "error", props.dispatch)
            });
    } else {
        GlobalActions.openNotification("Please select a client.", "error", props.dispatch)
    }
}
export const handleSaveGLRecords = (props) => {
    let f = () => {
        let payload = {}
        //prepare data 
        payload.uid = props.global.selectedClient.uid
        payload.coaId = props.clientCOA.currentCOAId
        payload.toadd = []
        payload.todelete = []
        let oldRec = props.clientCOA.currentCOARecords
        let newRec = props.clientCOA.currentCOARecordsWip

        //prepare toadd
        newRec.forEach(function(rec) {
            var found = false
            for (var i =0; i< oldRec.length;i++){
                if (rec.recid === oldRec[i].recid){
                    found = true
                    break
                }
            }
            if(!found) payload.toadd.push(rec)
        }, this)

        //prepare todelete
        oldRec.forEach(function(rec) {
            var found = false
            for (var i =0; i< newRec.length;i++){
                if (rec.recid === newRec[i].recid){
                    found = true
                    break
                }
            }
            if(!found) payload.todelete.push(rec.recid)
        }, this)

        props.dispatch(GlobalActions.addSubLoadingCount());
        CommonServices
            .http()
            .put('glrecords', payload)
            .then((response) => {
                props.dispatch(GlobalActions.reduceSubLoadingCount());
                GlobalActions.openNotification("The changes have been saved successfully", "success", props.dispatch)
                let account = {guid:props.clientCOA.currentCOAId}
                handleFetchGLRecordsForAccount(account,props)
            })
            .catch((err) => {
                props.dispatch(GlobalActions.reduceSubLoadingCount());
                GlobalActions.openNotification(err, "error", props.dispatch)
            });
    }
    let options = {
        confirmation: 'Are you sure to save the GL records?',
        show: true,
        proceed: f
    }
    if (props.global.selectedClient.uid) {
        props.dispatch(GlobalActions.openPopupConfirmation(options))
    }else{
        GlobalActions.openNotification("Please select a client.", "error", props.dispatch)
    }

    
}



