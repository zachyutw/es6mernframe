import { ASYNC_PHASES } from 'redux-action-tools'
import _ from 'lodash'
export default ({ dispatch }) => {
  return (next) => (action) => {
    const asyncPhase = _.get(action, 'meta.asyncPhase')
    const omitLoading = _.get(action, 'meta.omitLoading')

    if (asyncPhase && !omitLoading) {
      console.log(action)

      dispatch({
        type: asyncPhase === ASYNC_PHASES.START ? 'ASYNC_STARTED' : 'ASYNC_ENDED',
        payload: {
          source: 'ACTION',
          action
        },
        isLoading: asyncPhase === ASYNC_PHASES.START
      })
    }

    return next(action)
  }
}
