import React from 'react';
import { Route, IndexRoute} from 'react-router';
// Containers
import Full from './containers/Full/Full';
import Dashboard from './views/Dashboard/Dashboard.jsx';
import PendingDocuments from './views/PendingDocuments/PendingDocuments.jsx';
import Clients from './views/Clients/Clients.jsx';
import Reporting from './views/Reporting/Reporting.jsx';
import ChartOfAccounts from './views/ChartOfAccounts/ChartOfAccounts.jsx';
import Incomes from './views/Incomes/Incomes.jsx';
import Expenses from './views/Expenses/Expenses.jsx';
import Files from './views/Files/Fisdss.jsx';
import GlobalSettings from './views/GlobalSettings/GlobalSettings.jsx';
import ClientSettings from './views/ClientSettings/ClientSettings.jsx';
import GlobalSetting1s from './views/GlobalSettings/GlobalSettings.jsx';
import ClientSetting5s from './views/ClientSettings/ClientSettings.jsx';
import ClieewewwentSetting5s from './views/ClientSettings/222.jsx';

export default(

 
    <Route path="/" name="Home" component={Full}>
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" name="Dashboard" component={Dashboard}/>
      <Route
        path="pendingdocuments"
        name="Pending Documents"
        component={PendingDocuments}/>
      <Route path="clients" name="Clients" component={Clients}/>
    <Route path="setu2p" name="Setup" component={GlobalSettings}/>      
      <Route path="setup" name="Setup" component={GlobalSettings}/>
      <Route path="/client" name="Client">
        <IndexRoute component={Clients}/>
        <Route path="reporting" name="Reporting" component={Reporting}/>
        <Route path="chartofaccounts" name="Chart of Accounts" component={ChartOfAccounts}/>
        <Route path="incomes" name="Incomes" component={Incomes}/>
        <Route path="expenses" name="Expenses" component={Expenses}/>
        <Route path="files" name="Files" component={Files}/>
        <Route path="settings" name="Settings" component={ClientSettings}/>
        
      </Route>
    </Route>
   

);
