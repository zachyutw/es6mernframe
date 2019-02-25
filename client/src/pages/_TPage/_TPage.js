import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Container, Header } from 'semantic-ui-react'
class _TPage extends React.Component {
    state = {};
    static propTypes = { noMeaning: PropTypes.string };
    static defaultProps = { noMeaning: '' };
    render () {
      return (
        <div>
          <Container>
            <Header>Page</Header>
          </Container>
        </div>
      )
    }
}
const mapStateToProps = (state, ownProps) => {
  console.log(state)
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(_TPage)
