import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Input, Form } from 'semantic-ui-react'
import s from './InputNormal.module.css'

class InputNormal extends Component {
    static propTypes = {
      className: PropTypes.string,
      style: PropTypes.object,
      propOnChange: PropTypes.func,
      name: PropTypes.string,
      input: PropTypes.object
    };
    static defaultProps = {
      name: null,
      input: {},
      isForm: false,
      meta: { touched: false, invalid: false, error: false }
    };
    handleOnChange = (event, data) => {
      if (!_.isEmpty(this.props.input)) {
        this.props.input.onChange(event.target.value)
      } else {
        this.props.onChange(event, { name: this.props.name, value: data.value })
      }
    };
    render () {
      const { input, propOnChange, meta, isForm, ...rest } = this.props
      const { error, touched } = meta
      const { onChange, ...restInput } = input
      return (
        <div style={{ paddingTop: '0.5em', paddingBottom: '0.5em' }}>
          {isForm ? (
            <Form.Input className={s.input} fluid onChange={this.handleOnChange} {...restInput} {...rest} />
          ) : (
            <Input className={s.input} fluid onChange={this.handleOnChange} {...restInput} {...rest} />
          )}

          {error && touched && <p style={{ color: 'red' }}> {error}</p>}
        </div>
      )
    }
}

export default InputNormal
