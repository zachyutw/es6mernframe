import { poweredRedux, initState, REDUCER_NAME } from '../types/global.type'

export const name = REDUCER_NAME
const reducer = (state = initState, action) => {
  const basicCases = poweredRedux.basicCases(state, action)
  if (basicCases) {
    return basicCases
  }
  return state
}

export default reducer
