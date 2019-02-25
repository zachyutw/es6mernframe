import { Type } from '../actions/product.action'
import _ from 'lodash'
export const REDUCER_NAME = 'product'
const MODEL_NAME = REDUCER_NAME
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
  switch (action.type) {
    case Type.setInit:
      return {
        ...initState
      }
    case Type.setValue:
      const setValueName = action.payload.name || 'undefine'
      return {
        ...state,
        payload: action.payload,
        [setValueName]: action.payload.value
      }
    case Type.setItem:
      const setItem = action.payload[MODEL_NAME] || action.payload
      return {
        ...state,
        payload: action.payload,
        [MODEL_NAME]: setItem
      }
    case Type.setList:
      const setList = action.payload[MODEL_NAMES] || action.payload
      return {
        ...state,
        payload: action.payload,
        [MODEL_NAMES]: setList
      }
    case Type.postItem:
      const postItem = action.payload[MODEL_NAME] || action.payload
      return {
        ...state,
        isLoading: false,
        payload: action.payload,
        [MODEL_NAME]: postItem,
        [MODEL_NAMES]: [ ...state[MODEL_NAMES], postItem ]
      }
    case Type.getItem:
      const getItem = action.payload[MODEL_NAME] || action.payload
      return {
        ...state,
        isLoading: false,
        payload: action.payload,
        [MODEL_NAME]: getItem
      }
    case Type.getItemSchema:
      const getIemSchema = action.payload[MODEL_SCHEMA] || action.payload
      return {
        ...state,
        isLoading: false,
        payload: action.payload,
        schema: getIemSchema
      }
    case Type.putListIds:
      const putListIds = action.payload[MODEL_NAMES] || action.payload
      return {
        ...state,
        payload: action.payload,
        [MODEL_NAMES]: putListIds
      }
    case Type.putItem:
      const putItem = action.payload[MODEL_NAME] || action.payload
      return {
        ...state,
        isLoading: false,
        payload: action.payload,
        [MODEL_NAME]: putItem,
        [MODEL_NAMES]: _.map(state[MODEL_NAMES], (data) => (data.id === putItem.id ? putItem : data))
      }
    case Type.deleteItem:
      console.log(action)
      const deleteItem = action.payload[MODEL_NAME] || action.payload
      return {
        ...state,
        isLoading: false,
        payload: action.payload,
        [MODEL_NAME]: {},
        [MODEL_NAMES]: _.reject(state[MODEL_NAMES], (data) => data.id === deleteItem.id)
      }
    case Type.postList:
      const postList = action.payload[MODEL_NAMES] || action.payload
      return {
        ...state,
        isLoading: false,
        payload: action.payload,
        [MODEL_NAMES]: [ ...state[MODEL_NAMES], ...postList ]
      }
    case Type.getList:
      return {
        ...state,
        isLoading: false,
        payload: action.payload,
        [MODEL_NAMES]: action.payload[MODEL_NAMES]
      }
    case Type.deleteList:
      return {
        ...state,
        isLoading: false,
        payload: {},
        [MODEL_NAMES]: []
      }
    case Type.start:
      return {
        ...state,
        payload: {},
        isLoading: true
      }
    case Type.fail:
      return {
        ...state,
        payload: {},
        isLoading: false,
        error: action.payload.error
      }
    default:
      return state
  }
}

export default reducer
