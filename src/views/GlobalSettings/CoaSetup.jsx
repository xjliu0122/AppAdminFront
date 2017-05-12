import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import {BootstrapTable, TableHeaderColumn, InsertButton, DeleteButton} from 'react-bootstrap-table'
import Select from 'react-select'
import * as GlobalSettingActions from '../../actions/GlobalSettingActions'

class CoaSetup extends Component {

  constructor(props) {
    super(props)
    this.props = props
    this.coaData = []
    this.state = {
      selectedRows: []
    }
    GlobalSettingActions.fetchTemplate(props)

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
    this.onSaveTemplate = this
      .onSaveTemplate
      .bind(this)
    this.onDeleteTemplate = this
      .onDeleteTemplate
      .bind(this)
    this.onSaveAsTemplate = this
      .onSaveAsTemplate
      .bind(this)

    this.onRowSelectAll = this
      .onRowSelectAll
      .bind(this)
    //GlobalSettingActions.setTemplateSelection("Default", this.props)
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
    GlobalSettingActions.setWipTemplate(data, this.props)
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
    GlobalSettingActions.setWipTemplate(data, this.props)
  }

  handleTemplateSelectionChange(value) {
    GlobalSettingActions.setTemplateSelection(value.value, this.props)

    if (this.props.globalSetting.templates.length != 0) {
      this.coaData = (this.props.globalSetting.templates.filter(function (template) {
        return (template.name === value.value)
      }))[0].data
      GlobalSettingActions.setWipTemplate(this.coaData, this.props)
    }
  }
  onSaveTemplate() {
    GlobalSettingActions.handleSaveTemplate(this.props.globalSetting.templateSelection, this.props)
  }

  onDeleteTemplate() {
    GlobalSettingActions.handleDeleteTemplate(this.props.globalSetting.templateSelection, this.props)
  }
  onSaveAsTemplate() {
    GlobalSettingActions.handleSaveAsTemplate(this.refs.refSaveAsTemplate.value, this.props)
  }
  componentWillMount() {}

  composeSelectTemplateOptions() {
    let selectTemplateOptions = []
    this
      .props
      .globalSetting
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
      afterInsertRow: this.onAfterInsertRow

    }
    const selectRow = {
      mode: 'checkbox',
      clickToExpand: true,
      onSelect: this.onRowSelect,
      onSelectAll: this.onRowSelectAll,
      selected: this.state.selectedRows
    }
    const selectedTemplate = this.props.globalSetting.templateSelection

    return (
      <div className="animated fadeIn">
        <div className="row">
          <label className="form-control-label apply-template-label" htmlFor="idDocType">Template
          </label>
          <div className="col-3">
            <Select
              id="idSelectTemplate"
              options={selectTemplateOptions}
              name="idSelectTemplate"
              value={selectedTemplate}
              onChange={this.handleTemplateSelectionChange}/>
          </div>

          <button
            type="button"            
            className="btn btn-sm btn-primary apply-template-label"
            onClick={this.onSaveTemplate}>
            <i className="fa fa-floppy-o"></i>&nbsp; Save</button>
          <button
            type="button"            
            className="btn btn-sm btn-primary apply-template-label"
            onClick={this.onDeleteTemplate}>
            <i className="fa fa-upload"></i>&nbsp; Delete</button>

          <div className="col-3 margin-top-2">
            <input
              type="text"
              ref="refSaveAsTemplate"
              className="form-control"              
              placeholder="Enter a new name"/>

          </div>
          <button
            type="button"            
            className="btn btn-sm btn-primary apply-template-label"
            onClick={this.onSaveAsTemplate}>
            <i className="fa fa-plus"></i>&nbsp; Save As</button>

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
              bordered={false}>
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