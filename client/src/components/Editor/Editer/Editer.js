import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import InputNormal from '../../Input/InputNormal/InputNormal'
import { Button, Form, Grid } from 'semantic-ui-react'

class Editer extends Component {
    state = { doubleClicked: false, _value: '' };
    static propTypes = {
      className: PropTypes.string,
      style: PropTypes.object,
      propOnChange: PropTypes.func,
      name: PropTypes.string,
      onSubmit: PropTypes.func,
      component: PropTypes.func,
      input: PropTypes.object
    };
    static defaultProps = {
      name: 'default',
      onSubmit: (value) => console.log(value),
      component: () => <div />
    };

    componentDidUpdate (prevProps) {
      if (prevProps.value !== this.props.value) {
        this.setState({ _value: this.props.value })
      }
    }
    handleOnChange = (e, data) => {
      this.setState({ _value: data.value })
    };
    handleOnDoubleClick = () => {
      this.setState({ doubleClicked: true })
    };

    handleSubmit = (e) => {
      const name = this.props.name || 'undefine'
      this.props.onSubmit({ [name]: _.isEmpty(this.state._value) ? 'Empty' : this.state._value })
      this.setState({ doubleClicked: false })
    };
    render () {
      const { name, children, placeholder, label, type, component } = this.props
      const { doubleClicked, _value } = this.state
      return doubleClicked ? (
        <Form style={{ marginBottom: '2em' }}>
          <Grid>
            <Grid.Column width={12}>
              {_.isEmpty(component) ? (
                <InputNormal onChange={this.handleOnChange} name={name} type={type} value={_value} />
              ) : (
                React.createElement(component, {
                  onChange: this.handleOnChange,
                  name,
                  placeholder,
                  label,
                  type,
                  value: _value
                })
              )}
            </Grid.Column>
            <Grid.Column width={4}>
              <Button onClick={this.handleSubmit}>Save</Button>
            </Grid.Column>
          </Grid>
        </Form>
      ) : (
        children(this.handleOnDoubleClick)
      )
    }
}

export default Editer
