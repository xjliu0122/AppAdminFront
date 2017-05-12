import React, {Component, PropTypes} from 'react'
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import classnames from 'classnames'
import 'react-select/dist/react-select.css'
import 'react-datepicker/dist/react-datepicker.css'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import moment from 'moment'
import * as CurrentDocumentActions from '../../actions/CurrentDocumentActions'

class Steps extends Component {
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
    validate() {
        return this
            .refs
            .refTransaction
            .validate()
    }
    getState(){
        let stateBank = this.refs.refBank.getState()
        let stateTransaction  = this.refs.refTransaction.getState()
        return Object.assign(stateBank, stateTransaction);
    }
    render() {

        return (
            <div className="row">
                <div className="col-12 margin-left-15">
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({
                                active: this.state.activeTab === '1'
                            })}
                                onClick={() => {
                                this.toggle('1');
                            }}>
                                Transaction
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
                                Bank
                            </NavLink>
                        </NavItem>

                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <StepTransaction ref='refTransaction' {...this.props}/>
                        </TabPane>
                        <TabPane tabId="2"><StepBank ref='refBank' {...this.props}/></TabPane>

                    </TabContent>
                </div>
            </div>
        )
    }
}

export default Steps

class StepBank extends Component {
    constructor(props) {
        super(props)
        this.props = props
        this.state = {}
        if(this.props.currentDocument.doc.selectedBankTransaction){
            this.state.selected = this.props.currentDocument.doc.selectedBankTransaction
        }
        this.onSelectBankEntry = this
            .onSelectBankEntry
            .bind(this)
        this.handleBankPeriodSelectChange = this
            .handleBankPeriodSelectChange
            .bind(this) 
    }
    onSelectBankEntry(tr, isSelected) {
        if (isSelected) {
            this.setState({selected: tr.transactionId, selectedObject:tr})
        } else {
            this.setState({selected: null,selectedObject:null})
        }

    }
    handleBankPeriodSelectChange(newValue){
        this.setState({bankPeriod: newValue.value})
        //fetch base on the selected period
        if (newValue){
            CurrentDocumentActions.handleFetchBankTransactionsByDays(newValue.value,this.props)
        }
    }
    getState() {
        return this.state
    }
    componentWillMount() {
        this.sourceOptions = [
            {
                value: '30',
                label: 'Last 30 days'
            }, {
                value: '90',
                label: 'Last 90 days'
            }, {
                value: '365',
                label: 'Last 365 days'
            }
        ]
    }
    render() {
        const options = {
            hideSizePerPage: true,
            sizePerPage: 6
        };

        let selectRow = {
            mode: 'radio',
            clickToSelect: true,
            onSelect: this.onSelectBankEntry
        }

        if (this.state.selected) 
            selectRow.selected = [this.state.selected]
            
        return (

            <div>
                <div className="form-group row no-margin ">
                    <label className="col-2 form-control-label" htmlFor="idBankPeriod">Period</label>
                    <div className="col-4">
                        <Select
                            id="idBankPeriod"
                            options={this.sourceOptions}
                            name="idBankPeriod"
                            value={this.state.bankPeriod}
                            onChange={this.handleBankPeriodSelectChange}/> 

                    </div>
                </div>
                <div className="row no-margin ">

                    <BootstrapTable
                        data={this.props.currentDocument.doc.bankTransactions
                        ? this.props.currentDocument.doc.bankTransactions
                        : []}
                        options={options}
                        tableStyle={{
                        height: '326px'
                    }}
                        pagination
                        bordered={false}
                        selectRow={selectRow}>
                        <TableHeaderColumn dataField="transactionId" isKey hidden>id</TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="transactionDate"
                            dataAlign="center"
                            dataSort={true}>Date</TableHeaderColumn>
                        <TableHeaderColumn dataField="amount" dataAlign="center" dataSort={true}>Amount</TableHeaderColumn>
                        <TableHeaderColumn dataField="name" dataAlign="center" dataSort={false}>Description</TableHeaderColumn>

                        <TableHeaderColumn dataField="institution" dataAlign="center" dataSort={false}>Bank</TableHeaderColumn>
                        <TableHeaderColumn dataField="subtype" dataAlign="center" dataSort={false}>Type</TableHeaderColumn>
                        <TableHeaderColumn dataField="accountName" dataAlign="center" dataSort={false}>Account</TableHeaderColumn>
                        <TableHeaderColumn dataField="accountNo" dataAlign="center" dataSort={false}>Account No</TableHeaderColumn>

                    </BootstrapTable>

                </div>
            </div>

        );
    }
}
class StepTransaction extends Component {
    constructor(props) {
        super(props)
        this.typeOptions = this.props.currentDocument.doc.typeOptions
        this.currOptions = this.props.currentDocument.doc.currOptions
        this.categoryOptions = this.props.currentDocument.doc.categoryOptions
        this.identifierOptions = this.props.currentDocument.doc.identifierOptions
        this.exchangeRate = this.props.currentDocument.doc.identifierOptions
        //initial state from redux
        this.state = {
            docSupplier: this.props.currentDocument.doc.docSupplier,
            docType: this.props.currentDocument.doc.docType,
            docDate: moment(this.props.currentDocument.doc.docDate),
            docCurr: this.props.currentDocument.doc.docCurr,
            docIdentifier: this.props.currentDocument.doc.docIdentifier,
            docCategory: this.props.currentDocument.doc.docCategory,
            docComment: this.props.currentDocument.doc.comment,
            docAmount: this.props.currentDocument.doc.docTotalAmount,
            docTaxAmount: this.props.currentDocument.doc.docTaxAmount,
            docAmountUSD: this.props.currentDocument.doc.docTotalUSD,
            docTaxAmountUSD: this.props.currentDocument.doc.docTaxUSD
        }
        this.handleDocDateChange = this
            .handleDocDateChange
            .bind(this)
        this.handleDocType = this
            .handleDocType
            .bind(this)
        this.handleCurrSelect = this
            .handleCurrSelect
            .bind(this)
        this.handleCategorySelect = this
            .handleCategorySelect
            .bind(this)
        this.handleIdentifierSelect = this
            .handleIdentifierSelect
            .bind(this)
        this.handleDocCommentChange = this
            .handleDocCommentChange
            .bind(this)
        this.handleDocAmountChange = this
            .handleDocAmountChange
            .bind(this)
        this.handleDocTaxAmountChange = this
            .handleDocTaxAmountChange
            .bind(this)
        this.handleDocSupplierChange = this
            .handleDocSupplierChange
            .bind(this)

    }
    handleDocDateChange(date) {
        this.setState({docDate: date, docDateErrorMessage: ''})
    }
    handleDocType(newValue) {

        this.setState({docType: newValue, docTypeErrorMessage: ''});
    }
    handleCurrSelect(newValue) {

        this.setState({docCurr: newValue, docCurrencyErrorMessage: ''});
    }
    handleCategorySelect(newValue) {
        this.setState({docCategory: newValue, docCategoryErrorMessage: ''});
    }
    handleIdentifierSelect(newValue) {
        this.setState({docIdentifier: newValue, docIdentifierErrorMessage: ''});
    }
    handleDocSupplierChange(e) {
        this.setState({docSupplier: e.target.value});
    }
    handleDocCommentChange(e) {
        this.setState({docComment: e.target.value});
    }
    handleDocAmountChange(e) {
        this.setState({docAmount: e.target.value, docAmountErrorMessage: ''});
    }
    handleDocTaxAmountChange(e) {
        this.setState({docTaxAmount: e.target.value, docTaxAmountErrorMessage: ''});
    }
    validate() {
        //clear error messages.
        this.setState({
            docTypeErrorMessage: '',
            docCategoryErrorMessage: '',
            docDateErrorMessage: '',
            docCurrencyErrorMessage: '',
            docIdentifierErrorMessage: '',
            docAmountErrorMessage: '',
            docTaxAmountErrorMessage: ''
        })
        // required fields
        let isOK = true;
        if (!this.state.docType) {
            isOK = false
            this.setState({docTypeErrorMessage: '* Required'})
        }
        if (!this.state.docDate) {
            isOK = false
            this.setState({docDateErrorMessage: '* Required'})
        }
        if (!this.state.docCategory) {
            isOK = false
            this.setState({docCategoryErrorMessage: '* Required'})
        }
        if (!this.state.docCurr) {
            isOK = false
            this.setState({docCurrencyErrorMessage: '* Required'})
        }
        if (!this.state.docIdentifier) {
            isOK = false
            this.setState({docIdentifierErrorMessage: '* Required'})
        }
        if (!this.state.docAmount) {
            isOK = false
            this.setState({docAmountErrorMessage: '* Required'})
        }
        // set tax amount to 0 if not supplied
        if (!this.state.docTaxAmount) {
            this.setState({docTaxAmount: 0})
        }
        //check numeric fields.
        if (this.state.docTaxAmount && isNaN(this.state.docTaxAmount)) {
            isOK = false
            this.setState({docTaxAmountErrorMessage: '* Only numeric value is allowed'})
        }
        if (this.state.docAmount && isNaN(this.state.docAmount)) {
            isOK = false
            this.setState({docAmountErrorMessage: '* Only numeric value is allowed'})
        }

        return isOK
    }
    getState() {
        return this.state
    }
    render() {
        return (
            <div>
                <div className="form-group row no-margin ">
                    <label className="col-2 form-control-label" htmlFor="idDocType">Type<span className="text-danger">*</span>
                    </label>
                    <div className="col-4">
                        <Select
                            id="idDocType"
                            options={this.typeOptions}
                            name="idDocType"
                            value={this.state.docType}
                            onChange={this.handleDocType}></Select>
                        <span className="text-danger">{this.state.docTypeErrorMessage}</span>
                    </div>

                </div>
                <div className="form-group row no-margin ">
                    <label className="col-2 form-control-label">Date<span className="text-danger">*</span>
                    </label>
                    <div className="col-4">
                        <DatePicker
                            name="idTransactionDate"
                            className="width-100 form-control"
                            selected={this.state.docDate}
                            onChange={this.handleDocDateChange}/>
                        <span className="text-danger">{this.state.docDateErrorMessage}</span>
                    </div>

                    <label className="col-2 form-control-label" htmlFor="idSupplier">Supplier</label>

                    <div className="col-4">
                        <input
                            type="text"
                            id="idSupplier"
                            className="form-control"
                            value={this.state.docSupplier}
                            onChange={this.handleDocSupplierChange}
                            placeholder="Supplier"></input>

                    </div>

                </div>
                <hr/>
                <div className="form-group row no-margin ">
                    <label className="col-2 form-control-label">Currency<span className="text-danger">*</span>
                    </label>
                    <div className="col-4">
                        <Select
                            options={this.currOptions}
                            value={this.state.docCurr}
                            onChange={this.handleCurrSelect}></Select>
                        <span className="text-danger">{this.state.docCurrencyErrorMessage}</span>
                    </div>
                    <label className="col-2 form-control-label">Identifier<span className="text-danger">*</span>
                    </label>
                    <div className="col-4">
                        <Select
                            options={this.identifierOptions}
                            value={this.state.docIdentifier}
                            onChange={this.handleIdentifierSelect}></Select>
                        <span className="text-danger">{this.state.docIdentifierErrorMessage}</span>
                    </div>
                </div>
                <div className="form-group row no-margin ">
                    <label className="col-2 form-control-label">Total Amount<span className="text-danger">*</span>
                    </label>
                    <div className="col-4">
                        <input
                            type="text"
                            id="idTotalAmount"
                            name="idTotalAmount"
                            className="form-control"
                            value={this.state.docAmount}
                            onChange={this.handleDocAmountChange}
                            placeholder=""></input>
                        <span className="text-danger">{this.state.docAmountErrorMessage}</span>
                    </div>

                    <label className="col-2 form-control-label" htmlFor="idTaxAmount">Tax Amount</label>

                    <div className="col-4">
                        <input
                            type="text"
                            id="idTaxAmount"
                            name="idTaxAmount"
                            className="form-control"
                            value={this.state.docTaxAmount}
                            onChange={this.handleDocTaxAmountChange}
                            placeholder=""></input>
                        <span className="text-danger">{this.state.docTaxAmountErrorMessage}</span>
                    </div>

                </div>
                <div className="form-group row no-margin ">
                    <label className="col-2 form-control-label">Total/USD<span className="text-danger">*</span>
                    </label>
                    <div className="col-4">
                        <input
                            disabled
                            type="text"
                            id="idTotalAmountUSD"
                            name="idTotalAmountUSD"
                            className="form-control"
                            value={this.state.docAmountUSD}
                            placeholder=""></input>
                    </div>

                    <label className="col-2 form-control-label" htmlFor="idTaxAmountUSD">Tax/USD</label>

                    <div className="col-4">
                        <input
                            disabled
                            type="text"
                            id="idTaxAmountUSD"
                            name="idTaxAmountUSD"
                            className="form-control"
                            value={this.state.docTaxAmountUSD}
                            placeholder=""></input>

                    </div>

                </div>
                <div className="form-group row no-margin ">
                    <label className="col-2 form-control-label">Category<span className="text-danger">*</span>
                    </label>
                    <div className="col-4">
                        <Select
                            id="idCategory"
                            options={this.categoryOptions}
                            name="idCategory"
                            value={this.state.docCategory}
                            onChange={this.handleCategorySelect}></Select>
                        <span className="text-danger">{this.state.docCategoryErrorMessage}</span>
                    </div>

                    <label className="col-2 form-control-label" htmlFor="idComment">Comment</label>

                    <div className="col-4">
                        <textarea
                            rows="3"
                            id="idComment"
                            name="idComment"
                            className="form-control"
                            value={this.state.docComment}
                            onChange={this.handleDocCommentChange}
                            placeholder=""></textarea>

                    </div>

                </div>
            </div>
        );
    }
}