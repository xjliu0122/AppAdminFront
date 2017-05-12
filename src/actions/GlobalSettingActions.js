import * as CommonServices from './CommonServices'
import * as GlobalActions from './GlobalActions'

export const FETCH_TEMPLATE_FULFILLED = "FETCH_TEMPLATE_FULFILLED"
export const SET_TEMPLATE_SELECTION = "SET_TEMPLATE_SELECTION"
export const SET_WIP_TEMPLATE = "SET_WIP_TEMPLATE"

export const fetchTemplateFulfilled = (template) => {
    return {type: FETCH_TEMPLATE_FULFILLED, data: template}
}
export const setTemplateSelectionAction = (value) => {
    return {type: SET_TEMPLATE_SELECTION, data: value}
}
export const setWipTemplateAction = (value) => {
    return {type: SET_WIP_TEMPLATE, data: value}
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
export const setWipTemplate = (value, props) => {
    props.dispatch(setWipTemplateAction(value))
}
export const handleDeleteTemplate = (templateName, props) => {
    let f = () => {
        props.dispatch(GlobalActions.addLoadingCount())
        CommonServices
            .http()
            .delete('templates/' + templateName)
            .then((response) => {
                props.dispatch(GlobalActions.reduceLoadingCount());
                GlobalActions.openNotification("Template deleted successfully", "success", props.dispatch)
                fetchTemplate(props)
            })
            .catch((err) => {
                props.dispatch(GlobalActions.reduceLoadingCount());
                GlobalActions.openNotification(err, "error", props.dispatch)
            });
    }
    let options = {
        confirmation: 'Are you sure to delete template: ' + templateName + '?',
        show: true,
        proceed: f
    }
    props.dispatch(GlobalActions.openPopupConfirmation(options))
}
export const handleSaveTemplate = (templateName, props) => {
    
    let f = () => {
        props.dispatch(GlobalActions.addLoadingCount())
        CommonServices
            .http()
            .post('templates', {
                name: templateName,
                data: props.globalSetting.wipTemplate
            })
            .then((response) => {
                props.dispatch(GlobalActions.reduceLoadingCount());
                GlobalActions.openNotification("Template saved successfully", "success", props.dispatch)
            })
            .catch((err) => {
                props.dispatch(GlobalActions.reduceLoadingCount());
                GlobalActions.openNotification(err, "error", props.dispatch)
            });
    }
    let options = {
        confirmation: 'Are you sure to overwrite template: ' + templateName + '?',
        show: true,
        proceed: f
    }
    props.dispatch(GlobalActions.openPopupConfirmation(options))
}
export const handleSaveAsTemplate = (templateName, props) => {
    
    let f = () => {
        props.dispatch(GlobalActions.addLoadingCount())
        CommonServices
            .http()
            .put('templates', {
                name: templateName,
                data: props.globalSetting.wipTemplate
            })
            .then((response) => {
                props.dispatch(GlobalActions.reduceLoadingCount());
                fetchTemplate(props)
                GlobalActions.openNotification("Template saved successfully", "success", props.dispatch)
            })
            .catch((err) => {
                props.dispatch(GlobalActions.reduceLoadingCount());
                GlobalActions.openNotification(err, "error", props.dispatch)
            });
    }
    let options = {
        confirmation: 'Are you sure to save to template: ' + templateName + '?',
        show: true,
        proceed: f
    }
    props.dispatch(GlobalActions.openPopupConfirmation(options))
}
