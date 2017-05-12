import React, {Component} from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';
import CoaSetup from './CoaSetup.jsx'
import Loader from 'react-loader'

class ClientSettings extends Component {

  constructor(props) {
    super(props)
    this.toggle = this
      .toggle
      .bind(this);
    this.state = {
      activeTab: '1'
    }
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({activeTab: tab});
    }
  }

  componentWillMount() {}

  render() {
    return (
      <div className="row">
        <Loader loaded={this.props.global.loading === 0}/>        
        <div className="col-12">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({
                active: this.state.activeTab === '1'
              })}
                onClick={() => {
                this.toggle('1');
              }}>
                Chart of Accounts
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                active: this.state.activeTab === '2'
              })}
                onClick={() => {
                this.toggle('2');
              }}>
                Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                active: this.state.activeTab === '3'
              })}
                onClick={() => {
                this.toggle('3');
              }}>
                Messages
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <CoaSetup {...this.props}/>
            </TabPane>
            <TabPane tabId="2">
            
            </TabPane>
            <TabPane tabId="3">
           
            </TabPane>
          </TabContent>
        </div>
      </div>
    )
  }
}

import {connect} from 'react-redux'

export default connect((store) => {
  return store
})(ClientSettings)