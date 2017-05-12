import React, {Component} from 'react';
import Cards from './Cards.jsx'
import KPIChart from './KPIChart.jsx'
import MsgAndReminder from './MsgAndReminder.jsx'

// actions
import * as actions from '../../actions/DashboardActions'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.fetchData = this
      .fetchData
      .bind(this)
  }

  componentWillMount() {
    this.fetchData()
  }

  fetchData() {
    actions.fetchKPI(this.props);
    actions.fetchMessage(this.props);
    actions.fetchRemindar(this.props);
  }
 
  render() {

    return (
      <div className="animated fadeIn">
        <Cards/>
        <div className="row kpi-row">
          <div className="col-lg-6 col-sm-12 ">
            <KPIChart {...this.props}/>
          </div>
          <div className="col-lg-6 col-sm-12">
            <MsgAndReminder/>
          </div>
        </div>
      </div>

    )
  }
}

import {connect} from 'react-redux'
export default connect((store) => {
  return store
})(Dashboard)