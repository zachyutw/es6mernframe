import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { reduxForm, Field, reset, change, registerField, getFormValues } from 'redux-form'
import ProductConnect from '../../../redux/connecters/product.connecter'

import InputAll from '../../Input/InputAll/InputAll'
import { connect } from 'react-redux'
import { Form } from 'semantic-ui-react'
import s from './ProductForm.module.css'

const FORM = 'ProductForm'

class ProductForm extends Component {
    contentRef = React.createRef();
    fields = {
      name: { name: 'name', placeholder: 'Type product name', label: 'Name', isForm: true, type: 'text' },
      price: { name: 'price', placeholder: 'Type Number', label: 'Price', isForm: true, type: 'number' },
      title: { name: 'title', placeholder: 'Type Title', label: 'Title', isForm: true, type: 'text' }
    };
    fieldCustom = {
      desc: {
        name: 'desc',
        placeholder: 'Type some description',
        label: 'Description',
        isForm: true,
        type: 'richText'
      },
      address: { name: 'address', placeholder: 'Type some address', label: 'Address', isForm: true, type: 'text' }
    };
    fieldKeys = _.keys(this.fields);
    state = {};
    static propTypes = {
      formValues: PropTypes.object,
      propsSubmit: PropTypes.func
    };
    static defaultProps = {
      formValues: {},
      isEdit: false,
      propsSubmit: () => console.log('submit')
    };
    componentDidMount () {
      this.fieldKeys.map((fieldKey) => this.props.registerField(FORM, fieldKey, 'Field'))
      if (this.props.initializeValue) {
        this.props.initialize(this.props.initializeValue)
      }
    }
    handleOnChange = (event, data) => {
      let { name, value, checked, type, toggle } = data
      if (type === 'radio' && toggle) {
        value = checked
      }
      this.props.change(FORM, name, value)
    };

    handleReset = () => {
      const { initialize, reset, propsSubmit } = this.props

      initialize({})
      reset(FORM)
      propsSubmit()
    };

    handleSubmit = (e) => {
      const { propsSubmit, formValues, isEdit } = this.props
      if (isEdit) {
        this.props.putItem(formValues.id, formValues)
      } else {
        this.props.postItem(formValues)
      }
      propsSubmit(formValues)
    };

    render () {
      const { formValues, isDesktop } = this.props

      return (
        <Form onSubmit={this.handleSubmit} className={[ s.form, isDesktop ? '' : s.mobile ].join(' ')}>
          {this.fieldKeys.map((fieldKey, index) => (
            <Field
              key={index}
              component={InputAll.Noraml}
              {...this.fields[fieldKey]}
              value={formValues[this.fields[fieldKey].name]}
            />
          ))}
          <Field component={InputAll.RichTextEditor} {...this.fieldCustom.desc} />
          <InputAll.AutoCompleteAddress
            {...this.fieldCustom.address}
            onChange={this.handleOnChange}
            value={formValues[this.fieldCustom.address.name]}
          />
        </Form>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    formValues: getFormValues(FORM)(state)
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    change: (form, field, value) => dispatch(change(form, field, value)),
    registerField: (form, field, type) => dispatch(registerField(form, field, type)),
    reset: (form) => dispatch(reset(form))
  }
}
export default reduxForm({
  form: FORM,
  onChange: (values, dispatch) => {
    // saveStorage.save(FORM, values);
    // console.log(dispatch);
  }
  // validate,
  // warn
  // a unique identifier for this form validate, // <--- validation function given
  // to redux-form warn, // <--- warning function given to redux-form
  // initialValues: { min: '1', max: '10' }
})(connect(mapStateToProps, mapDispatchToProps)(ProductConnect(ProductForm)))
