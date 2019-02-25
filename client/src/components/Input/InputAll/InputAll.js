import React, { Component } from 'react'
import InputNormal from '../InputNormal/InputNormal'
import InputRichTextEditor from '../InputRichTextEditor/InputRichTextEditor'
import InputAutoCompleteAddress from '../InputAutoCompleteAddress/InputAutoCompleteAddress'
class InputAll extends Component {
    static Noraml = InputNormal;
    static RichTextEditor = InputRichTextEditor;
    static AutoCompleteAddress = InputAutoCompleteAddress;
    render () {
      return <div style={{ paddingTop: '0.5em', paddingBottom: '0.5em' }} />
    }
}

export default InputAll
