import React, { Component } from 'react'
import _ from 'lodash'
import { reduxForm, Field, reset, change, registerField, getFormValues } from 'redux-form'
import inputAll from '../../Input/InputAll/InputAll'
import { connect } from 'react-redux'
import { Form } from 'semantic-ui-react'
import s from './BasicForm.module.css'

// import {home} from 'map/map';
const FORM = 'BasicForm'
// const selector = formValueSelector(FORM);

class BasicForm extends Component {
    contentRef = React.createRef();
    fields = {
      username: { name: 'username', placeholder: 'Type Title', type: 'text' }
    };
    state = {};
    componentDidMount () {
      const fieldKeys = _.keys(this.fields)
      fieldKeys.map((fieldKey) => this.props.registerField(FORM, fieldKey, 'Field'))
    }
    handleOnChange = (event, data) => {
      let { name, value, checked, type, toggle } = data
      if (type === 'radio' && toggle) {
        value = checked
      }
      this.props.change(FORM, name, value)
    };

    handleReset = () => {
      const { initialize, reset, propsSubmit = () => console.log('submit') } = this.props

      initialize({})
      reset()
      propsSubmit()
    };

    handleSubmit = (e) => {
      const { propsSubmit = () => console.log('submit') } = this.props
      propsSubmit()
    };

    render () {
      const { formValues, isDesktop } = this.props
      console.log(this.props)
      return (
        <Form onSubmit={this.handleSubmit} className={[ s.form, isDesktop ? '' : s.mobile ].join(' ')}>
          <Field
            component={inputAll.Noraml}
            {...this.fields.username}
            value={formValues[this.fields.username.name]}
          />
        </Form>
      )
    }
}

const mapStateToProps = (state) => {
  // console.log(state.form.HousesFiltersForm); console.log(state.form[FORM]);
  return {
    formValues: getFormValues(FORM)(state) || {}
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    change: (form, field, value) => dispatch(change(form, field, value)),
    registerField: (form, field, type) => dispatch(registerField(form, field, type)),
    reset: () => dispatch(reset(FORM))
  }
}
export default reduxForm({
  form: FORM
  // validate,
  // warn
  // a unique identifier for this form validate, // <--- validation function given
  // to redux-form warn, // <--- warning function given to redux-form
  // initialValues: { min: '1', max: '10' }
})(connect(mapStateToProps, mapDispatchToProps)(BasicForm))
