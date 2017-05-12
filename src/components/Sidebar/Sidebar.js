import React, {Component} from 'react';
import {Link} from 'react-router'

class Sidebar extends Component {

  handleClick(e) {
    e.preventDefault();
    e
      .target
      .parentElement
      .classList
      .toggle('open');
  }

  activeRoute(routeName) {
    return this
      .props
      .location
      .pathname
      .indexOf(routeName) > -1
      ? 'nav-item nav-dropdown open'
      : 'nav-item nav-dropdown';
  }

  // secondLevelActive(routeName) {   return
  // this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level
  // collapse in" : "nav nav-second-level collapse"; }

  render() {
    return (
      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav">
            <li className="nav-item">
              <Link to={'/dashboard'} className="nav-link" activeClassName="active">
                <i className="icon-speedometer"></i>
                Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link to={'/pendingdocuments'} className="nav-link" activeClassName="active">
                <i className="icon-docs"></i>
                Pending Documents</Link>
            </li>
            <li className="nav-item">
              <Link to={'/clients'} className="nav-link" activeClassName="active">
                <i className="icon-people"></i>
                Clients</Link>
            </li>
            <li className="nav-item">
              <Link to={'/setup'} className="nav-link" activeClassName="active">
                <i className="icon-people"></i>
                Setup</Link>
            </li>
            <li className="nav-title">
              Client Specific
            </li>
            <li className="nav-item">
              <Link to={'/client/reporting'} className="nav-link" activeClassName="active">
                <i className="icon-calendar"></i>
                Reporting</Link>
            </li>
            <li className="nav-item">
              <Link
                to={'/client/chartofaccounts'}
                className="nav-link"
                activeClassName="active">
                <i className="icon-list"></i>
                Chart of Accounts</Link>
            </li>
            <li className="nav-item">
              <Link to={'/client/incomes'} className="nav-link" activeClassName="active">
                <i className="icon-wallet"></i>
                Incomes</Link>
            </li>
            <li className="nav-item">
              <Link to={'/client/expenses'} className="nav-link" activeClassName="active">
                <i className="icon-credit-card"></i>
                Expenses</Link>
            </li>
            <li className="nav-item">
              <Link to={'/client/files'} className="nav-link" activeClassName="active">
                <i className="icon-paper-clip"></i>
                Files</Link>
            </li>
            <li className="nav-item">
              <Link to={'/client/settings'} className="nav-link" activeClassName="active">
                <i className="icon-paper-clip"></i>
                Settings</Link>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Sidebar;
