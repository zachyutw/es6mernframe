import { actionType } from '../../actions/Action/_v1.action'
import _ from 'lodash'
export const REDUCER_NAME = '_v1'
const MODEL_NAME = actionType.model
const MODEL_NAMES = MODEL_NAME + 's'
const MODEL_SCHEMA = MODEL_NAME + 'Schema'
const initState = {
  isLoading: false,
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
    case actionType.postItem.SET:
      const postItem = action.payload[MODEL_NAME] || action.payload
      return {
        ...state,
        isLoading: false,
        payload: action.payload,
        [MODEL_NAME]: postItem,
        [MODEL_NAMES]: [ ...state[MODEL_NAMES], postItem ]
      }
    case actionType.getItem.SET:
      const getItem = action.payload[MODEL_NAME] || action.payload
      return {
        ...state,
        isLoading: false,
        payload: action.payload,
        [MODEL_NAME]: getItem
      }
    case actionType.getItemSchema.SET:
      const getIemSchema = action.payload[MODEL_SCHEMA] || action.payload
      return {
        ...state,
        isLoading: false,
        payload: action.payload,
        schema: getIemSchema
      }
    case actionType.putListIds.SET:
      const putListIds = action.payload[MODEL_NAMES] || action.payload
      return {
        ...state,
        payload: action.payload,
        [MODEL_NAMES]: putListIds
      }
    case actionType.putItem.SET:
      const putItem = action.payload[MODEL_NAME] || action.payload
      return {
        ...state,
        isLoading: false,
        payload: action.payload,
        [MODEL_NAME]: putItem,
        [MODEL_NAMES]: _.map(state[MODEL_NAMES], (data) => (data.id === putItem.id ? putItem : data))
      }
    case actionType.deleteItem.SET:
      console.log(action)
      const deleteItem = action.payload[MODEL_NAME] || action.payload
      return {
        ...state,
        isLoading: false,
        payload: action.payload,
        [MODEL_NAME]: {},
        [MODEL_NAMES]: _.reject(state[MODEL_NAMES], (data) => data.id === deleteItem.id)
      }
    case actionType.postList.SET:
      const postList = action.payload[MODEL_NAMES] || action.payload
      return {
        ...state,
        isLoading: false,
        payload: action.payload,
        [MODEL_NAMES]: [ ...state[MODEL_NAMES], ...postList ]
      }
    case actionType.getList.SET:
      return {
        ...state,
        isLoading: false,
        payload: action.payload,
        [MODEL_NAMES]: action.payload[MODEL_NAMES]
      }
    case actionType.deleteList.SET:
      return {
        ...state,
        isLoading: false,
        payload: {},
        [MODEL_NAMES]: []
      }
    case actionType.postList.START ||
            actionType.getList.START ||
            actionType.deleteList.START ||
            actionType.putListIds.START:
      return {
        ...state,
        isLoading: true
      }
    case actionType.getItem.START ||
            actionType.postItem.START ||
            actionType.putItem.START ||
            actionType.deleteItem.START:
      return {
        ...state,
        isLoading: true,
        [MODEL_NAME]: {}
      }
    case actionType.postList.FAIL ||
            actionType.getList.FAIL ||
            actionType.deleteList.FAIL ||
            actionType.putListIds.FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case actionType.getItem.FAIL ||
            actionType.getItem.START ||
            actionType.putItem.FAIL ||
            actionType.deleteItem.FAIL:
      return {
        ...state,
        [MODEL_NAME]: {},
        isLoading: false,
        error: action.payload.error
      }
    default:
      return state
  }
}

export default reducer
