import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import Loader from 'react-loader'
import * as ClientsActions from '../../actions/ClientsActions'

class Clients extends Component {
  constructor(props) {
    super(props)
    this.props = props
    // get own users.
    ClientsActions.fetchClients(this.props)
    this.handleSelect = this
      .handleSelect
      .bind(this)
    this.buttonFormatter = this
      .buttonFormatter
      .bind(this)
    this.nameFormatter = this
      .nameFormatter
      .bind(this)
    this.srvLevelFormatter = this
      .srvLevelFormatter
      .bind(this)
    this.photoFormatter = this
      .photoFormatter
      .bind(this)
  }

  
  handleSelect(e) {
    ClientsActions.setSelectedClient(e.target.name,this.props)
  }
  buttonFormatter(cell, row) {
    return (
      <button
        type="button"
        name={row.uid}
        className="btn btn-primary"
        onClick={(e) => this.handleSelect(e)}>Select</button>
    )
  }
  nameFormatter(cell, row) {
    if (row && row.displayName) {
      return row.displayName
    } else 
      return ("N/A")
  }
  photoFormatter(cell, row) {
    if (row && row.photoURL) {
      return <img
        style={{
        height: 50,
        width: 50
      }}
        src={row.photoURL}/>
    } else 
      return ("")
  }

  srvLevelFormatter(cell, row) {
    return ("N/A")
  }
  componentWillMount() {}

  render() {
    const tableOptions = {
      hideSizePerPage: true
    }
    return (
      <div>
        <Loader loaded={this.props.global.loading === 0}/> {(this.props.global.loading === 0)
          ? <div id="client-table" className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <div className="col col-3 header-client pull-left">
                      <div className="input-group">
                        <input
                          type="text"
                          id="inputSearch"
                          className="form-control client-search-button"
                          placeholder="Search"/>
                        <button className="btn btn-primary client-search-button">
                          <i className="fa fa-search"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card-block"
                    style={{
                    textAlign: 'center'
                  }}>
                    <BootstrapTable
                      data={this.props.clients.clients}
                      options={tableOptions}
                      bordered={false}>
                      <TableHeaderColumn
                        dataField="photoURL"
                        dataAlign="center"
                        dataSort={false}
                        dataFormat={this.photoFormatter}
                        width='70'></TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="displayName"
                        dataAlign="center"
                        dataSort={true}
                        dataFormat={this.nameFormatter}
                        tdStyle={{
                        verticalAlign: 'middle'
                      }}>Name</TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="email"
                        dataAlign="center"
                        tdStyle={{
                        verticalAlign: 'middle'
                      }}
                        dataSort={true}>Email</TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="created_at"
                        dataAlign="center"
                        dataSort={false}
                        tdStyle={{
                        verticalAlign: 'middle'
                      }}>Membership Since</TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="servicelevel"
                        dataAlign="center"
                        dataSort={false}
                        dataFormat={this.srvLevelFormatter}
                        tdStyle={{
                        verticalAlign: 'middle'
                      }}>Service Level</TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="uid"
                        isKey={true}
                        dataAlign="center"
                        dataSort={false}
                        dataFormat={this.buttonFormatter}
                        tdStyle={{
                        verticalAlign: 'middle'
                      }}></TableHeaderColumn>

                    </BootstrapTable>
                  </div>
                </div>
              </div>
            </div>
          : null}
      </div>

    )
  }
}

import {connect} from 'react-redux'
export default connect((store) => {
  return store
})(Clients)
