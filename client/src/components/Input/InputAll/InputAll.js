import React, { Component } from 'react';
import InputNormal from '../InputNormal/InputNormal';
import InputRichTextEditor from '../InputRichTextEditor/InputRichTextEditor';
import InputAutoCompleteAddress from '../InputAutoCompleteAddress/InputAutoCompleteAddress';
import InputSelection from '../InputSelection/InputSelection';
class InputAll extends Component {
    static Normal = InputNormal;
    static RichTextEditor = InputRichTextEditor;
    static AutoCompleteAddress = InputAutoCompleteAddress;
    static Selection = InputSelection;
    render () {
        return <div style={{ paddingTop: '0.5em', paddingBottom: '0.5em' }} />;
    }
}

export default InputAll;
