import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import '../react-bootstrap-table-all.min.css'
import DocumentForm from '../Common/DocumentMaintain.jsx'
import {Dropdown, DropdownMenu, DropdownItem} from 'reactstrap'
import Loader from 'react-loader'
import * as ClientIncomeActions from '../../actions/ClientIncomeActions'
import * as CurrentDocumentActions from '../../actions/CurrentDocumentActions'

class Incomes extends Component {

  constructor(props) {
    super(props)
    this.props = props
    ClientIncomeActions.handleFetchIncomeDocuments(this.props)
  }
  componentWillMount(){
    
  }
  render() {
    return (
      <div>      
        <Loader loaded={this.props.global.loading === 0}/> {(this.props.global.loading === 0)
          ? <DocumentCards {...this.props}/>
          : null}
      </div>
    )
  }
}

class DocumentCards extends Component {

  constructor(props) {
    super(props)
    this.props = props
    this.expandComponent = this.expandComponent.bind(this)
    this.onRowClick = this.onRowClick.bind(this)
    this.expandColumnComponent = this
    .expandColumnComponent
    .bind(this)
  }
  componentWillMount() {
    

  }
  expandComponent(row) {
    return (
      <div className="card inline-doc shadow">
        <div className="card-block">
          <Loader loaded={this.props.global.subLoading === 0}/>
          {(this.props.global.subLoading === 0)
            ? <DocumentForm/>
            : null}
        </div>
      </div>
    );
  }
  onRowClick(doc){
    CurrentDocumentActions.handleExpandDocument(doc,this.props)
  } 
  tickFormatter(cell, row){
    let component = cell ?  (<i className='fa fa-check' style={{color:'#5cb85c'}}/>) : ''
    return (    
      component
    )
  }
  expandColumnComponent({isExpandableRow, isExpanded}) {
    let content = '';
    if (!isExpanded) {
      content = (
        <i className="fa fa-plus" aria-hidden="true"></i>
      )
    } else {
      content = (
        <i className="fa fa-minus" aria-hidden="true"></i>
      )
    }

    return (
      <div>
        {content}
      </div>
    )
  }  
  render() {
    const options = {
      hideSizePerPage: true,
      sizePerPage: 15,
      onlyOneExpanding: true,
      onRowClick: this.onRowClick
    }
    const selectRow = {
      mode: 'checkbox',
      clickToExpand: true // Trigger expand and selection together
    }

    return (
      <div>
        <div id="documentTable" className="row ">
          <div className="col-12">
            <div className="card">
              <div className="card-header">

                <div className="col col-3 header-client pull-left">
                  <div className="col col-3 header-client pull-left">
                    <button className="btn btn-sm btn-primary client-filter-button">
                      <i className="fa fa-filter"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-block">
                <BootstrapTable
                  data={this.props.clientIncome.documents}                  
                  options={options}
                  pagination
                  expandableRow={() => {
                  return true
                }}
                  expandComponent={this.expandComponent}
                  expandColumnOptions={{
                    expandColumnVisible: true,
                    expandColumnComponent: this.expandColumnComponent,
                    columnWidth: 50
                  }}         
                  bordered={false}>
                  <TableHeaderColumn dataField="docId" isKey hidden>id</TableHeaderColumn>
                  <TableHeaderColumn dataField="created_at" dataAlign="center" dataSort={true}>Date</TableHeaderColumn>
                  <TableHeaderColumn dataField="transactionTotalAmount" dataAlign="center" dataSort={true}>Amount</TableHeaderColumn>
                  <TableHeaderColumn dataField="processed" dataAlign="center" dataSort={true} dataFormat={ this.tickFormatter }>Processed</TableHeaderColumn>
                  <TableHeaderColumn dataField="matched" dataAlign="center" dataSort={true} dataFormat={ this.tickFormatter }>Matched</TableHeaderColumn>
                  <TableHeaderColumn dataField="linkedBank" dataAlign="center" dataSort={true}>Bank</TableHeaderColumn>
                  <TableHeaderColumn dataField="transactionCategoryDesc" dataAlign="center" dataSort={true}>Category</TableHeaderColumn>
                  <TableHeaderColumn dataField="transactiondate" dataAlign="center" dataSort={true}>Date</TableHeaderColumn>
                  <TableHeaderColumn dataField="transactionIdentifier" dataAlign="center" dataSort={false}>Identifier</TableHeaderColumn>

                </BootstrapTable>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

import {connect} from 'react-redux'
export default connect((store) => {
  return {clientIncome:store.clientIncome,global:store.global}
})(Incomes)