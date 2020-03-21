import React, {Component} from 'react'
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
const loadScript = require('load-script');

const scriptUrl = 'https://cdn.ckeditor.com/4.14.0/standard/ckeditor.js';

class CKEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isScriptLoaded: props.isScriptLoaded
        };

        this.mounted = false;
        this.loadEditor = this.loadEditor.bind(this);
    }

    componentDidMount() {
        this.mounted = true;

        if (!this.state.isScriptLoaded) {
            loadScript(this.props.scriptUrl, this.loadEditor);
        } else {
            this.loadEditor();
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    isCKEditorLoaded() {
        return window.CKEDITOR;
    }
    loadEditor() {
        if (!this.mounted) {
            return; // we don't want to load to an unmounted component
        }

        this.setState({
            isScriptLoaded: true
        });


        if (!this.isCKEditorLoaded()) {
            console.error('CKEditor not loaded');
            return;
        }

        this.ckEditor = window.CKEDITOR.appendTo(
            ReactDOM.findDOMNode(this),
            this.props.config,
            this.props.content
        );

        for (let event in this.props.events) {
            let eventHandler = this.props.events[event];
            this.ckEditor.on(event, eventHandler);
        }

    }

    render() {
        return (
            <div className={this.props.className} />
        );
    }
}

CKEditor.defaultProps = {
    content: '',
    config: {},
    isScriptLoaded: false,
    scriptUrl: scriptUrl,
    className: '',
    events: {}
};

CKEditor.propTypes = {
    content: PropTypes.any,
    config: PropTypes.object,
    isScriptLoaded: PropTypes.bool,
    scriptUrl: PropTypes.string,
    className: PropTypes.string,
    events: PropTypes.object
};

export default CKEditor;