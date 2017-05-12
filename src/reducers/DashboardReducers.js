import * as DashboardActions from '../actions/DashboardActions'

export const dashboardReducer = (state = {KPI:{},
message:{},
remindar:{}
}, action) => {
    switch (action.type) {
        case DashboardActions.FETCH_KPI_FULFILLED:
            return Object.assign({},state, { KPI: action.payload})
        default: return {...state }
    }

}