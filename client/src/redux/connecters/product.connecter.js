import { connect } from 'react-redux'
import action from '../actions/product.action'
import { REDUCER_NAME } from '../reducers/product.reducer'
const mapStateToProps = (state) => {
  return { ...state[REDUCER_NAME] }
}
// const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, { ...action })
