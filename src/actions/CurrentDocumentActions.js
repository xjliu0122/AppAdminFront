import * as CommonServices from './CommonServices'
import * as GlobalActions from './GlobalActions'
import * as ClientIncomeActions from './ClientIncomeActions'


import {CurrencyOptions} from '../constant/CurrencyOptions'

export const CLIENT_SET_CURRENT_OPENED_DOC_FULFILLED = "CLIENT_SET_CURRENT_OPENED_DOC_FULFILLED"
export const CLIENT_SET_NEW_TRANSACTION_DATA_FOR_OPENED_DOC_FULFILLED = "CLIENT_SET_NEW_TRANSACTION_DATA_FOR_OPENED_DOC_FULFILLED"

export const setCurrentOpenedDoc = (data) => {
    return {type: CLIENT_SET_CURRENT_OPENED_DOC_FULFILLED, data: data}
}
export const setNewTransactionDataForOpenedDoc = (data) => {
    return {type: CLIENT_SET_NEW_TRANSACTION_DATA_FOR_OPENED_DOC_FULFILLED, data: data}
}

export const handleSaveProcessedDocument = (doc, props) => {
    //part from redux
    let currentDoc = props.currentDocument.doc
    // part from state : doc
    let toPush = {}
    toPush.docId = currentDoc.docId
    toPush.clientUid = currentDoc.uid
    toPush.comment = doc.docComment
    toPush.transactionTotalAmount = doc.docAmount
    toPush.type = doc.docType.value ?doc.docType.value : doc.docType
    toPush.transactioncurr = doc.docCurr.value
        ? doc.docCurr.value
        : doc.docCurr
    toPush.transactiondate = doc
        .docDate
        .format("YYYYMMDD")
    toPush.transactionSupplier = doc.docSupplier
    toPush.transactionIdentifier = doc.docIdentifier.value ? doc.docIdentifier.value :doc.docIdentifier
    toPush.transactionCategory = doc.docCategory.value ? doc.docCategory.value : doc.docCategory
    if(  doc.docCategory && doc.docCategory.value )  toPush.transactionCategoryDesc =  doc.docCategory.label
    toPush.transactionTaxAmount = doc.docTaxAmount
    toPush.linkedBankTransaction = doc.selected    
    toPush.linkedBank =  doc.selectedObject ? doc.selectedObject.institution : ''

    props.dispatch(GlobalActions.addSubLoadingCount())
    CommonServices
        .http()
        .post('processeddocument', toPush)
        .then((response) => {
            GlobalActions.openNotification("Document saved successfully", "success", props.dispatch)
            // update local instance in redux 
            
            let currentDoc = props.currentDocument.doc
            currentDoc.docType = toPush.type
            currentDoc.docSupplier = toPush.transactionSupplier
            currentDoc.docDate = toPush.transactiondate
            currentDoc.docCurr =toPush.transactioncurr
            currentDoc.docIdentifier = toPush.transactionIdentifier
            currentDoc.docCategory = toPush.transactionCategory
            currentDoc.docTotalAmount = toPush.transactionTotalAmount
            currentDoc.docTaxAmount = toPush.transactionTaxAmount           
            currentDoc.selectedBankTransaction = toPush.linkedBankTransaction
            currentDoc.comment = toPush.comment
              
            props.dispatch(setCurrentOpenedDoc(currentDoc))

            //update the client document table buffer 
            let clientDocs = props.clientIncome.documents
            clientDocs.forEach(function(clientDoc) {
                if (clientDoc.docId === currentDoc.docId){
                    toPush.processed = true
                    toPush.matched = true
                    if (toPush.linkedBank === '') {
                        delete toPush.linkedBank
                        delete toPush.matched
                    }
                    clientDoc = Object.assign(clientDoc,toPush)      

                }
            }, this);

            props.dispatch(ClientIncomeActions.fetchIncomeDocumentsFulfilled(clientDocs))
            props.dispatch(GlobalActions.reduceSubLoadingCount())
        })
        .catch((err) => {
            GlobalActions.openNotification({}, "error", props.dispatch)
            props.dispatch(GlobalActions.reduceSubLoadingCount())
        })
}
export const handleFetchBankTransactionsByDays = (days,props)=>{
    CommonServices
        .http()
        .post('clientbanktransactions', {
            uid: props.global.selectedClient.uid,
            period: days
        })
        .then((response) => {
            let bankTransactions = response.data
            props.dispatch(setNewTransactionDataForOpenedDoc(bankTransactions))            
        })
        .catch((err) => {
            GlobalActions.openNotification({}, "error", props.dispatch)
        })
}
export const handleExpandDocument = (doc, props) => {
    // get the document.
    let currentDoc = {
        ...doc
    }
    //get form options

    currentDoc.typeOptions = [
        {
            value: 'income',
            label: 'Income'
        }, {
            value: 'expense',
            label: 'Expense'
        }
    ]
    currentDoc.currOptions = CurrencyOptions
    let categoryOptions = []
    let identifierOptions = []
    let coa = []
    switch (doc.type) {
        case "income":
            coa = props
                .global
                .selectedClient
                .chartOfAccounts
                .filter(function (account) {
                    return account.Type === 'Income' // dont use indexOf!  IE<9  not supported
                }, this);
            break;
        case "expense":
            coa = props
                .global
                .selectedClient
                .chartOfAccounts
                .filter(function (account) {
                    return account.Type === 'Expenses'
                }, this);
            break;
        default:
    }
    coa
        .forEach(function (account) {
            let op = {
                value: account.guid,
                label: account.Account
            }
            categoryOptions.push(op)
        }, this);

    currentDoc.categoryOptions = categoryOptions

    if (props.global.selectedClient.identifierOptions) {
        props
            .global
            .selectedClient
            .identifierOptions
            .forEach(idOp => {
                let op = {
                    value: idOp,
                    label: idOp
                }
                identifierOptions.push(op)
            })
        currentDoc.identifierOptions = identifierOptions
    } else {
        currentDoc.identifierOptions = [
            {
                value: 'Default',
                label: 'Default'
            }
        ]
    }

    //get existing values.

    currentDoc.docType = doc.type
    currentDoc.docSupplier = doc.transactionSupplier
        ? doc.transactionSupplier
        : ''
    currentDoc.docDate = doc.transactiondate
        ? doc.transactiondate
        : doc.created_at
    currentDoc.docCurr = doc.transactioncurr
        ? doc.transactioncurr
        : 'USD'
    currentDoc.docIdentifier = doc.transactionIdentifier
        ? doc.transactionIdentifier
        : ''
    currentDoc.docCategory = doc.transactionCategory
        ? doc.transactionCategory
        : ''
    currentDoc.docTotalAmount = doc.transactionTotalAmount
        ? doc.transactionTotalAmount
        : ''
    currentDoc.docTaxAmount = doc.transactionTaxAmount
        ? doc.transactionTaxAmount
        : ''
    currentDoc.docTotalUSD = doc.transactionTotalUSD
        ? doc.transactionTotalUSD
        : ''
    currentDoc.docTaxUSD = doc.transactionTaxUSD
        ? doc.transactionTaxUSD
        : ''
    currentDoc.selectedBankTransaction = doc.linkedBankTransaction
        ? doc.linkedBankTransaction
        : null

    // fetch the original pic.
    currentDoc.bankTransactions = []
    props.dispatch(GlobalActions.addSubLoadingCount())
    CommonServices
        .http()
        .get('getoriginalpic/' + props.global.selectedClient.uid + '/' + currentDoc.docId)
        .then((response) => {
            currentDoc.picData = "data:image/png;base64," + response.data
            props.dispatch(GlobalActions.reduceSubLoadingCount())
            // fetch bank transactions
            props.dispatch(GlobalActions.addSubLoadingCount())
            if (!currentDoc.selectedBankTransaction) {
                return CommonServices
                    .http()
                    .post('clientbanktransactions', {
                        uid: props.global.selectedClient.uid,
                        period: 30
                    })
                    .then((response) => {
                        currentDoc.bankTransactions = response.data
                        props.dispatch(setCurrentOpenedDoc(currentDoc))
                        props.dispatch(GlobalActions.reduceSubLoadingCount())
                    })
                    .catch((err) => {
                        GlobalActions.openNotification({}, "error", props.dispatch)
                        props.dispatch(GlobalActions.reduceSubLoadingCount())
                    })
            } else 
                return CommonServices
                    .http()
                    .get('clientbanktransactionbyid/' + currentDoc.selectedBankTransaction)
                    .then((response) => {
                        currentDoc
                            .bankTransactions
                            .push(response.data)
                        props.dispatch(setCurrentOpenedDoc(currentDoc))
                        props.dispatch(GlobalActions.reduceSubLoadingCount())
                    })
                    .catch((err) => {
                        GlobalActions.openNotification({}, "error", props.dispatch)
                        props.dispatch(GlobalActions.reduceSubLoadingCount())
                    })
            }
        )
        .catch((err) => {
            GlobalActions.openNotification("The document picture is lost. Please contact the client for a new upload and obs" +
                    "elete this one.",
            "error", props.dispatch)
            props.dispatch(GlobalActions.reduceSubLoadingCount())
        })

}