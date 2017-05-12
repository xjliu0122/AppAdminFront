import React, {Component} from 'react'

class Header extends Component {
  constructor(props) {
    super(props)
    this.props = props
  }
  sidebarToggle(e) {
    e.preventDefault();
    document
      .body
      .classList
      .toggle('sidebar-hidden');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document
      .body
      .classList
      .toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document
      .body
      .classList
      .toggle('aside-menu-hidden');
  }

  render() {
    var name = this.props.global.selectedClient.displayName ? this.props.global.selectedClient.displayName :this.props.global.selectedClient.email 
    var label = (<div className='working-on-client'>
      Client: Not Selected{name}
    </div>)
    if (name) label  = (<div className='working-on-client'>
      Client: {name}
    </div>)
    return (
      <header className="app-header navbar">
        <button
          className="navbar-toggler mobile-sidebar-toggler hidden-lg-up"
          onClick={this.mobileSidebarToggle}
          type="button">&#9776;</button>
        <a className="navbar-brand" href="#"></a>
        <ul className="nav navbar-nav hidden-md-down">
          <li className="nav-item">
            <a
              className="nav-link navbar-toggler sidebar-toggler"
              onClick={this.sidebarToggle}
              href="#">&#9776;</a>
          </li>
        </ul>
        {label}
      </header>
    )
  }
}
import {connect} from 'react-redux'
export default connect((store) => {
  return store
})(Header)
