import React, {Component} from 'react'
import SplitPane from 'react-split-pane'
import Measure from 'react-measure';
import ReactDOM from 'react-dom';
import {Layer, Stage, Image} from 'react-konva';
import Steps from './Steps.jsx'
import moment from 'moment'
import * as CurrentDocumentActions from '../../actions/CurrentDocumentActions'

class DocumentForm extends Component {
    constructor(props) {
        super(props)
        this.props = props;
        this.state = {
            currentWidth: 300,
            currentheight: 0
        }
        this.resizeSplit = this
            .resizeSplit
            .bind(this)
        this.handleSubmitDocumentForm = this
            .handleSubmitDocumentForm
            .bind(this)
    }
    state = {
        image: null,
        width: 0,
        height: 0,
        stageWidth: 0,
        stageHeight: 0
    }
    componentDidMount() {
        const image = new window.Image();
        image.src = this.props.currentDocument.doc.picData
        image.onload = () => {
            var height = image.height * 300 / image.width;
            var width = 300;
            this.setState({image: image, width: width, height: height});
        }
    }
    resizeSplit(dimensions) {
        let newHeight = this.state.height * (dimensions.width - 5) / this.state.width;
        let stageWidth = dimensions.width
        let stageHeight = dimensions.height
        this.setState({
            height: newHeight,
            width: dimensions.width - 5,
            stageWidth: stageWidth,
            stageHeight: stageHeight
        })

    }
    handleSubmitDocumentForm() {
        let isOK = this.refs.refSteps.validate()
        let doc = {}
        if (isOK){
            doc = this.refs.refSteps.getState()
            CurrentDocumentActions.handleSaveProcessedDocument(doc, this.props)
        }
    }
    render() {
        return (
            <div className="modal-document">

                <div className="modal-document-content split-container">

                    <SplitPane split="vertical" allowResize={true} defaultSize={300} minSize={50}>
                        <div className="img-viewer">

                            <Measure
                                onMeasure={(dimensions) => {
                                this.resizeSplit(dimensions)
                            }}>
                                <div className='img-viewer-content bg-faded'>
                                    <Stage width={this.state.stageWidth} height={this.state.stageHeight}>

                                        <Layer>
                                            <Image
                                                width={this.state.width}
                                                height={this.state.height}
                                                draggable={true}
                                                image={this.state.image}/>
                                        </Layer>
                                    </Stage>
                                </div>
                            </Measure>
                            <div className="img-viewer-toolbar">
                                <button className="ft-icon icon-magnifier-add"></button>
                                <button className="ft-icon icon-magnifier-remove"></button>
                                <button className="ft-icon icon-action-redo"></button>
                                <button className="ft-icon icon-action-undo"></button>
                            </div>
                        </div>

                        <Steps ref='refSteps' {...this.props}/>

                    </SplitPane>

                </div>
                <div className="row modal-document-footer ">
                    <div className="col-12 float-left no-padding">
                        <button
                            type="button"
                            className="btn btn-sm btn-primary modal-ft-btn"
                            onClick={this.handleSubmitDocumentForm}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

import {connect} from 'react-redux'
export default connect((store) => {
    return store
})(DocumentForm)