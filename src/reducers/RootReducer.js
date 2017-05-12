import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { dashboardReducer as dashboard } from './DashboardReducers'
import { globalReducer as global } from './GlobalReducers'
import {reducer as notifications} from 'react-notification-system-redux';
import { reducer as forms} from 'redux-form'
import { clientSettingReducers as clientSetting } from './ClientSettingReducers'
import { globalSettingReducers as globalSetting } from './GlobalSettingReducers'
import { clientIncomeReducers as clientIncome } from './ClientIncomeReducers'
import { currentDocumentReducer as currentDocument } from './CurrentDocumentReducer'
import { clientsReducers as clients } from './ClientsReducers'
import { clientCOAReducers as clientCOA } from './ClientCOAReducers' 

const rootReducer = combineReducers({
  dashboard,
  global,
  notifications,  
  forms,
  clientSetting,
  clientIncome,
  globalSetting,
  clients,
  clientCOA,
  currentDocument,
  routing  
})

export default rootReducer