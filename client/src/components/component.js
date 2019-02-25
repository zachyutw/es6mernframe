import React from 'react'
import PropTypes from 'prop-types'

export default class component extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
    static propTypes = {
      className: PropTypes.string,
      style: PropTypes.object
    };
    static defaultProps = {};
    render () {
      return (
        <React.Fragment>
          <h1>RTE</h1>
        </React.Fragment>
      )
    }
}
