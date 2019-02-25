import { actionType } from '../../actions/Action/sync.action'

export const REDUCER_NAME = 'sync'
const MODEL_NAME = actionType.model
const MODEL_NAMES = MODEL_NAME + 's'

const initState = {
  name: REDUCER_NAME,
  modelName: MODEL_NAME,
  payload: {},
  params: {},
  schema: {},
  [MODEL_NAME]: sessionStorage.getItem(MODEL_NAME) || {},
  [MODEL_NAMES]: [],
  error: {}
}

const reducer = (state = initState, action) => {
  console.log(actionType)
  switch (action.type) {
    case actionType.setInit.SET:
      return {
        ...initState
      }
    case actionType.setValue.SET:
      const setValueName = action.payload.name || 'undefine'
      return {
        ...state,
        payload: action.payload,
        [setValueName]: action.payload.value
      }
    case actionType.setItem.SET:
      const setItem = action.payload[MODEL_NAME] || action.payload
      return {
        ...state,
        payload: action.payload,
        [MODEL_NAME]: setItem
      }
    case actionType.setList.SET:
      const setList = action.payload[MODEL_NAMES] || action.payload
      return {
        ...state,
        payload: action.payload,
        [MODEL_NAMES]: setList
      }
    default:
      return state
  }
}

export default reducer
