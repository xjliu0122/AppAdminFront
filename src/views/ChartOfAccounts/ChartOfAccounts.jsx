import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {BootstrapTable, TableHeaderColumn, ButtonGroup,InsertButton, DeleteButton} from 'react-bootstrap-table'
import '../react-bootstrap-table-all.min.css'
import Loader from 'react-loader'
import * as ClientCOAActions from '../../actions/ClientCOAActions'

class GLRecordsForm extends Component {
  constructor(props) {
    super(props)
    this.props = props
    this.glRecords = (this.props.clientCOA.currentCOARecords ? [...this.props.clientCOA.currentCOARecords] :[])
    this.state = {
      selectedRows: []
    }
    this.onRowClick = this
      .onRowClick
      .bind(this)
    this.createGLRecordsTableButtonGroup = this
      .createGLRecordsTableButtonGroup
      .bind(this)

    this.onAfterInsertRow = this
      .onAfterInsertRow
      .bind(this)
    this.handleDeleteButtonClick = this
      .handleDeleteButtonClick
      .bind(this)
    this.onRowSelect = this
      .onRowSelect
      .bind(this)
    this.onSaveAccounts = this
      .onSaveAccounts
      .bind(this)
    this.onRowSelectAll = this
      .onRowSelectAll
      .bind(this)
      
  }
  onRowClick() {}
  onSaveAccounts(){
    ClientCOAActions.handleSaveGLRecords(this.props)
  }
  tickFormatter(cell, row){
    let component = ( !row.docIdRef || row.docIdRef === '' ) ?  (<i className='fa fa-exclamation-circle ' style={{color:'#f8cb00'}}/>) : ''
    return (    
      component
    )
  }
  createGLRecordsTableButtonGroup(tableProps) {
    return (
      <ButtonGroup className='my-custom-class' sizeClass='btn-group-sm'>
        <button className="btn btn-sm btn-primary client-filter-button">
          <i className="fa fa-filter"></i>
        </button>
        {tableProps.insertBtn}
        {tableProps.deleteBtn}       
        
        <button type='button' className={`btn btn-success`} onClick={ () => this.onSaveAccounts() }>
          <i className="fa fa-floppy-o"></i>
          &nbsp;&nbsp;&nbsp;Save &nbsp;&nbsp;
        </button>
      </ButtonGroup>
    )
  }

  onRowSelectAll(isSelected) {
    var selected = []
    if (isSelected) {
      this
        .glRecords
        .forEach(function (item) {
          selected.push(item.recid)
        })
      this.setState({selectedRows: selected})
    } else {
      this.setState({selectedRows: []})
    }

  }
  onRowSelect({
      recid
    }, isSelected) {

    if (isSelected) {
      this.setState({
        selectedRows: [
          ...this.state.selectedRows,
          recid
        ].sort()

      });
    } else {
      this.setState({
        selectedRows: this
          .state
          .selectedRows
          .filter(it => it !== recid)
      });
    }
    return false;
  }
  createInsertButton = (onClick) => {
    return (<InsertButton
      btnText='&nbsp;&nbsp;&nbsp;Add &nbsp;&nbsp;'
      btnGlyphicon='fa fa-plus'/>)
  }

  createDeleteButton = (onClick) => {
    return (<DeleteButton
      btnText=' Delete'
      btnGlyphicon='fa fa-minus'
      onClick={e => this.handleDeleteButtonClick(onClick)}/>)
  }
  onAfterInsertRow(row) {
    let data = [row,...this.glRecords]  
    this.glRecords = data
    ClientCOAActions.setCoaRecordsWip(data, this.props)
  }

  handleDeleteButtonClick(e) {
    let data = this.glRecords
    this
      .state
      .selectedRows
      .forEach(function (key) {
        for (var i = 0; i < data.length; i++) {
          if (data[i] && data[i].recid === key) 
            delete data[i]
        }

      }, this);
    data = data.filter(function (n) {
      return n != undefined
    });
    this.glRecords = data
    this.setState({selectedRows: []})
    ClientCOAActions.setCoaRecordsWip(data, this.props)
  }


  render() {
    const options = {
      hideSizePerPage: true,
      sizePerPage: 10,
      onRowClick: this.onRowClick,
      btnGroup: this.createGLRecordsTableButtonGroup,
      insertBtn: this.createInsertButton,
      deleteBtn: this.createDeleteButton,
      afterInsertRow: this.onAfterInsertRow,
    }
    const selectRow = {
      mode: 'checkbox',
      clickToExpand: true,
      onSelect: this.onRowSelect,
      onSelectAll: this.onRowSelectAll,
      selected: this.state.selectedRows
    }
    return (
      <div>

        {/*GL records table*/}
        <BootstrapTable
          data={this.glRecords}
          options={options}
          insertRow
          deleteRow
          pagination
          expandableRow={() => {
          return false
        }}
          selectRow={selectRow}
          bordered={false}>
          <TableHeaderColumn dataField="recid" isKey hidden>recid</TableHeaderColumn>
          <TableHeaderColumn dataField="date" dataAlign="left" dataSort={true}>Transaction Date</TableHeaderColumn>
          <TableHeaderColumn dataField="amount" dataAlign="left" dataSort={false}>Amount</TableHeaderColumn>
          <TableHeaderColumn dataField="identifier" dataAlign="left" dataSort={false}>Identifier</TableHeaderColumn>
          <TableHeaderColumn dataField="Manual" dataAlign="center" dataSort={false} dataFormat={ this.tickFormatter }>Manual</TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }
}
class ChartOfAccounts extends Component {

  constructor(props) {
    super(props)
    this.props = props
    ClientCOAActions.handleFetchCOAData(this.props)
  }
  componentWillMount() {}
  render() {
    return (
      <div>
        <Loader loaded={this.props.global.loading === 0}/> {(this.props.global.loading === 0)
          ? <COAList {...this.props}/>
          : null}
      </div>
    )
  }
}

class COAList extends Component {

  constructor(props) {
    super(props)
    this.props = props
    this.state = {
      // Default expanding row
      expanding: []
    };
    this.expandComponent = this
      .expandComponent
      .bind(this)
    this.onRowClick = this
      .onRowClick
      .bind(this)
    this.expandColumnComponent = this
      .expandColumnComponent
      .bind(this)

  }
  componentWillMount() {}
  expandComponent(row) {
    let comp = ''
    if (this.props.clientCOA.currentCOAId === row.guid) 
      comp = (
        <div className="card inline-doc shadow">
          <div className="card-block">
            <Loader loaded={this.props.global.subLoading === 0}/> {(this.props.global.subLoading === 0)
              ? <GLRecordsForm {...this.props}/>
              : null}
          </div>
        </div>
      )
    return (
      <div>{comp}</div>
    )
  }
  onRowClick(doc) {
    ClientCOAActions.handleFetchGLRecordsForAccount(doc, this.props)
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
      sizePerPage: 12,
      onlyOneExpanding: true,
      onRowClick: this.onRowClick
    }
    return (
      <div>
        <div id="coaTable" className="row ">
          <div className="col-12">
            <div className="card">

              <div className="card-block">
                <BootstrapTable
                  data={this.props.clientCOA.accounts}
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
                  <TableHeaderColumn dataField="guid" isKey hidden>id</TableHeaderColumn>
                  <TableHeaderColumn dataField="Account" dataAlign="left" dataSort={false}>Account</TableHeaderColumn>
                  <TableHeaderColumn dataField="Detail type" dataAlign="left" dataSort={false}>Detail</TableHeaderColumn>
                  <TableHeaderColumn dataField="Type" dataAlign="left" dataSort={false}>Type</TableHeaderColumn>
                  <TableHeaderColumn dataField="total" dataAlign="left" dataSort={false}>Total</TableHeaderColumn>

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
  return store
})(ChartOfAccounts)
