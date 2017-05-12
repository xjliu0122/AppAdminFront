import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import {BootstrapTable, TableHeaderColumn, InsertButton, DeleteButton,ExportCSVButton} from 'react-bootstrap-table'
import Select from 'react-select'
import * as ClientSettingActions from '../../actions/ClientSettingActions'

class CoaSetup extends Component {

  constructor(props) {
    super(props)
    this.props = props
    ClientSettingActions.fetchTemplate(props)

    this.coaData = (this.props.global.selectedClient.chartOfAccounts ? this.props.global.selectedClient.chartOfAccounts :[])
    this.state = {
      selectedRows: []
    }

    this.handleTemplateSelectionChange = this
      .handleTemplateSelectionChange
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
    //ClientSettingActions.setTemplateSelection("Default", this.props)
  }
  onRowSelectAll(isSelected) {
    var selected = []
    if (isSelected) {
      this
        .coaData
        .forEach(function (item) {
          selected.push(item.Account)
        })
      this.setState({selectedRows: selected})
    } else {
      this.setState({selectedRows: []})
    }

  }
  onRowSelect({
    Account
  }, isSelected) {

    if (isSelected) {
      this.setState({
        selectedRows: [
          ...this.state.selectedRows,
          Account
        ].sort()

      });
    } else {
      this.setState({
        selectedRows: this
          .state
          .selectedRows
          .filter(it => it !== Account)
      });
    }
    return false;
  }
  createInsertButton = (onClick) => {
    return (<InsertButton
      btnText='&nbsp;&nbsp;&nbsp;Add &nbsp;&nbsp;'
      btnGlyphicon='fa fa-plus'/>)
  }
  createSaveButton = (onClick) => {
    //borrow this position
    return (<ExportCSVButton
      btnText='&nbsp;&nbsp;&nbsp;Save &nbsp;&nbsp;'
      btnGlyphicon='fa fa-floppy-o'
      onClick={ () => this.onSaveAccounts() }/>)
  }  
  createDeleteButton = (onClick) => {
    return (<DeleteButton
      btnText=' Delete'
      btnGlyphicon='fa fa-minus'
      onClick={e => this.handleDeleteButtonClick(onClick)}/>)
  }
  onAfterInsertRow(row) {
    let data = [...this.coaData]
    var index = 0;
    if (this.state.selectedRows.length > 0) {
      for (var i = 0; i < data.length; i++) {
        if (data[i] && data[i].Account === this.state.selectedRows[0]) 
          index = i;
        }
      }
    data.splice(index+1 , 0, row)

    this.coaData = data
    ClientSettingActions.setWipAccounts(data, this.props)
  }

  handleDeleteButtonClick(e) {
    let data = this.coaData
    this
      .state
      .selectedRows
      .forEach(function (key) {
        for (var i = 0; i < data.length; i++) {
          if (data[i] && data[i].Account === key) 
            delete data[i]
        }

      }, this);
    data = data.filter(function (n) {
      return n != undefined
    });
    this.coaData = data
    this.setState({selectedRows: []})
    ClientSettingActions.setWipAccounts(data, this.props)
  }

  handleTemplateSelectionChange(value) {
    ClientSettingActions.setTemplateSelection(value.value, this.props)

    if (this.props.clientSetting.templates.length != 0) {
      this.coaData = (this.props.clientSetting.templates.filter(function (template) {
        return (template.name === value.value)
      }))[0].data
      ClientSettingActions.setWipAccounts(this.coaData, this.props)
    }
  }
  onSaveAccounts() {
    ClientSettingActions.handleSaveAccounts(this.props)
  }

  componentWillMount() {}

  composeSelectTemplateOptions() {
    let selectTemplateOptions = []
    this
      .props
      .clientSetting
      .templates
      .forEach(function (template) {
        selectTemplateOptions.push({value: template.name, label: template.name})
      }, this);
    return selectTemplateOptions
  }

  render() {
    const selectTemplateOptions = this.composeSelectTemplateOptions()
    const tableOptions = {
      hideSizePerPage: true,
      insertBtn: this.createInsertButton,
      deleteBtn: this.createDeleteButton,
      afterInsertRow: this.onAfterInsertRow,
      exportCSVBtn: this.createSaveButton
    };
    const selectRow = {
      mode: 'checkbox',
      clickToExpand: true,
      onSelect: this.onRowSelect,
      onSelectAll: this.onRowSelectAll,
      selected: this.state.selectedRows
    };
    const selectedTemplate = this.props.clientSetting.templateSelection

    return (
      <div className="animated fadeIn">
        <div className="row">
          <label className="form-control-label apply-template-label" htmlFor="idDocType">Apply Template:
          </label>
          <div className="col-3">
            <Select
              id="idSelectTemplate"
              options={selectTemplateOptions}
              name="idSelectTemplate"
              value={selectedTemplate}
              onChange={this.handleTemplateSelectionChange}/>
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-12 no-pagenation-table">

            <BootstrapTable
              data={this.coaData}
              options={tableOptions}
              insertRow={true}
              deleteRow={true}
              selectRow={selectRow}
              hover={true}
              bordered={false} exportCSV>
              <TableHeaderColumn
                dataField="Account"
                dataAlign="left"
                isKey={true}
                dataSort={false}>Account</TableHeaderColumn>
              <TableHeaderColumn dataField="Type" dataAlign="left" dataSort={false}>Type</TableHeaderColumn>
              <TableHeaderColumn dataField="Detail type" dataAlign="left" dataSort={false}>Sub Type</TableHeaderColumn>

            </BootstrapTable>

          </div>
        </div>
      </div>

    )
  }
}

import {connect} from 'react-redux'
export default connect((store) => {
  return store
})(CoaSetup)