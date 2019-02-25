import { connect } from 'react-redux'
import actions from '../actions/global.action'
import { name as REDUCER_NAME } from '../reducers/global.reducer'
const mapStateToProps = (state) => {
  return { ...state[REDUCER_NAME] }
}
// const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, { ...actions })
