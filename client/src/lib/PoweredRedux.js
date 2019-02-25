import axios from 'axios'
import _ from 'lodash'

export const asyncStart = (type) => ({ type })
export const asyncFail = (type, error) => ({ type, payload: { error } })
export const setPalyoad = (type, payload) => ({ type, payload })
export const actionType = (reucerName, name, method = 'set') => {
  return reucerName + '/' + name + '_' + method
}

export default class PoweredRedux {
  constructor (reducerName, modelName, initState = {}) {
    this.modelName = modelName || 'object'
    this.initState = initState
    this.reducerName = reducerName || 'default'
    this.Types = this.getBasicTypes()
    this.ModelBaseTypes = this.getModelBaseTypes()
    this.RESTfulTypesNames = [
      'postList',
      'getList',
      'putListIds',
      'deleteList',
      'postItem',
      'getItem',
      'putItem',
      'deleteItem',
      'getItemSchema',
      'setItem',
      'setList'
    ]
    this.basicTypesNames = [ 'setValue', 'setParams', 'setInit', 'start', 'fail' ]
  }
    static setPalyoad = setPalyoad;
    static actionType = actionType;
    static asyncStart = asyncStart;
    static asyncFail = asyncFail;
    setReducerName = (reducerName) => {
      this.reducerName = reducerName
    };
    setModelName = (modelName) => {
      this.modelName = modelName
    };
    setInitState = (initState) => {
      this.initState = initState
    };
    setTypes = (types) => {
      this.Types = { ...this.Types, ...types }
    };
    setPayload = (type, paylaod) => ({ type, paylaod });
    getAsyncStart = () => asyncStart(this.Types['start']);
    getAsyncFail = (error) => asyncFail(this.Types['fail'], error);
    poweredReduxActions = (baseUrl = '', urlMapping = {}, client) => {
      const actions = this.Actions()
      const modelsBaseActions = this.ModelsBaseActions(baseUrl, urlMapping, client)
      return { ...actions, ...modelsBaseActions }
    };
    poweredReduxCases = (state = {}, action) => {
      const modelBaseCase = this.modelsBaseCases(state, action)
      const basicCases = this.basicCases(state, action)
      if (modelBaseCase) {
        return modelBaseCase
      }
      if (basicCases) {
        return basicCases
      }
      return null
    };
    basicActions = () => {
      let resourceAction = {}
      const Types = this.Types
      resourceAction.setValue = ({ name, value }) => (dispatch) =>
        dispatch(setPalyoad(Types['setValue'], { name, value }))

      resourceAction.setInit = () => (dispatch) => dispatch(setPalyoad(Types['setInit'], {}))
      resourceAction.setParams = (params) => (dispatch) => dispatch(setPalyoad(Types['setParams'], { params }))
      resourceAction.start = () => (dispatch) => dispatch(asyncStart(Types['start']))
      resourceAction.fail = (error) => (dispatch) => dispatch(asyncFail(Types['fail'], error))
      return resourceAction
    };
    modelsBaseActions = (baseUrl = '', urlMapping = {}, client) => {
      let resourceAction = {}
      const actionName = this.actionName
      const axiosClient = client || axios
      const Types = this.ModelBaseTypes
      resourceAction.setItem = (payload) => (dispatch) => dispatch(setPalyoad(Types['setItem'], payload))
      resourceAction.setList = (payload) => (dispatch) => dispatch(setPalyoad(Types['setList'], payload))
      resourceAction.postItem = ({ data, params }) => {
        const name = 'postItem'
        const apiUrl = !_.isEmpty(urlMapping[name]) ? urlMapping[name] : `${baseUrl}`
        const URL = `${apiUrl}/${actionName}/Item`
        return (dispatch) => {
          dispatch(asyncStart(Types.start))
          axiosClient
            .post(URL, data, { params })
            .then((res) => {
              dispatch(setPalyoad(Types[name], res.data))
            })
            .catch((error) => {
              dispatch(asyncFail(Types.fail, error))
            })
        }
      }

      resourceAction.getItem = ({ id, params }) => {
        const name = 'getItem'
        const apiUrl = !_.isEmpty(urlMapping[name]) ? urlMapping[name] : `${baseUrl}`
        const URL = `${apiUrl}/${actionName}/Item/${id}`
        return (dispatch) => {
          dispatch(asyncStart(Types.start))
          axiosClient
            .get(URL, { params })
            .then((res) => {
              dispatch(setPalyoad(Types[name], res.data))
            })
            .catch((error) => {
              dispatch(asyncFail(Types.fail, error))
            })
        }
      }
      resourceAction.putItem = ({ id, data, params }) => {
        const name = 'putItem'

        const apiUrl = !_.isEmpty(urlMapping[name]) ? urlMapping[name] : `${baseUrl}`
        const URL = `${apiUrl}/${actionName}/Item/${id}`
        return (dispatch) => {
          dispatch(asyncStart(Types.start))
          axiosClient
            .put(URL, data, { params })
            .then((res) => {
              dispatch(setPalyoad(Types[name], res.data))
            })
            .catch((error) => {
              dispatch(asyncFail(Types.fail, error))
            })
        }
      }
      resourceAction.deleteItem = ({ id }) => {
        const name = 'deleteItem'

        const apiUrl = !_.isEmpty(urlMapping[name]) ? urlMapping[name] : `${baseUrl}`
        const URL = `${apiUrl}/${actionName}/Item/${id}`
        return (dispatch) => {
          dispatch(asyncStart(Types.start))
          axiosClient
            .delete(URL)
            .then((res) => {
              dispatch(setPalyoad(Types[name], res.data))
            })
            .catch((error) => {
              dispatch(asyncFail(Types.fail, error))
            })
        }
      }
      resourceAction.getItemSchema = () => {
        const name = 'getItemSchema'

        const apiUrl = !_.isEmpty(urlMapping[name]) ? urlMapping[name] : `${baseUrl}`
        const URL = `${apiUrl}/${actionName}/Item/schema`
        return (dispatch) => {
          dispatch(asyncStart(Types.start))
          axiosClient
            .get(URL)
            .then((res) => {
              dispatch(setPalyoad(Types[name], res.data))
            })
            .catch((error) => {
              dispatch(asyncFail(Types.fail, error))
            })
        }
      }
      resourceAction.postList = ({ data, params }) => {
        const name = 'postList'

        const apiUrl = !_.isEmpty(urlMapping[name]) ? urlMapping[name] : `${baseUrl}`
        const URL = `${apiUrl}/${actionName}/list`
        return (dispatch) => {
          dispatch(asyncStart(Types.start))
          axiosClient
            .post(URL, data, { params })
            .then((res) => {
              dispatch(setPalyoad(Types[name], res.data))
            })
            .catch((error) => {
              dispatch(asyncFail(Types.fail, error))
            })
        }
      }
      resourceAction.putListIds = ({ ids, params }) => {
        const name = 'putListIds'

        const apiUrl = !_.isEmpty(urlMapping[name]) ? urlMapping[name] : `${baseUrl}`
        const URL = `${apiUrl}/${actionName}/list/ids`
        return (dispatch) => {
          dispatch(asyncStart(Types.start))
          axiosClient
            .put(URL, { ids }, { params })
            .then((res) => {
              dispatch(setPalyoad(Types[name], res.data))
            })
            .catch((error) => {
              dispatch(asyncFail(Types.fail, error))
            })
        }
      }
      resourceAction.getList = ({ params }) => (dispatch) => {
        const name = 'getList'
        const apiUrl = !_.isEmpty(urlMapping[name]) ? urlMapping[name] : `${baseUrl}`
        const URL = `${apiUrl}/${actionName}/list`
        dispatch(asyncStart(Types.start))
        axiosClient
          .get(URL, { params })
          .then((res) => {
            dispatch(setPalyoad(Types[name], res.data))
          })
          .catch((error) => {
            dispatch(asyncFail(Types.fail, error))
          })
      }
      resourceAction.deleteList = () => (dispatch) => {
        const name = 'deleteList'
        const apiUrl = !_.isEmpty(urlMapping[name]) ? urlMapping[name] : `${baseUrl}`
        const URL = `${apiUrl}/${actionName}/list`

        dispatch(asyncStart(Types.start))
        axiosClient
          .delete(URL)
          .then((res) => {
            dispatch(setPalyoad(Types[name], res.data))
          })
          .catch((error) => {
            dispatch(asyncFail(Types.fail, error))
          })
      }

      return resourceAction
    };

    modelsBaseCases = (state = {}, action) => {
      const Type = this.getModelBaseTypes()
      const MODEL_NAME = this.modelName
      const MODEL_NAMES = this.modelName + 's'
      const MODEL_SCHEMA = this.modelName + 'Schema'
      switch (action.type) {
        case Type.postItem:
          const postItem = action.payload[MODEL_NAME] || action.payload
          return {
            ...state,
            isLoading: false,
            isSuccess: true,
            payload: action.payload,
            [MODEL_NAME]: postItem,
            [MODEL_NAMES]: [ ...state[MODEL_NAMES], postItem ]
          }
        case Type.getItem:
          const getItem = action.payload[MODEL_NAME] || action.payload
          return {
            ...state,
            isLoading: false,
            isSuccess: true,
            payload: action.payload,
            [MODEL_NAME]: getItem
          }
        case Type.getItemSchema:
          const getIemSchema = action.payload[MODEL_SCHEMA] || action.payload
          return {
            ...state,
            isLoading: false,
            isSuccess: true,
            payload: action.payload,
            schema: getIemSchema
          }
        case Type.putListIds:
          const putListIds = action.payload[MODEL_NAMES] || action.payload
          return {
            ...state,
            isLoading: false,
            isSuccess: true,
            payload: action.payload,
            [MODEL_NAMES]: putListIds
          }
        case Type.putItem:
          const putItem = action.payload[MODEL_NAME] || action.payload
          return {
            ...state,
            isLoading: false,
            isSuccess: true,
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
            isSuccess: true,
            payload: action.payload,
            [MODEL_NAME]: {},
            [MODEL_NAMES]: _.reject(state[MODEL_NAMES], (data) => data.id === deleteItem.id)
          }
        case Type.postList:
          const postList = action.payload[MODEL_NAMES] || action.payload
          return {
            ...state,
            isLoading: false,
            isSuccess: true,
            payload: action.payload,
            [MODEL_NAMES]: [ ...state[MODEL_NAMES], ...postList ]
          }
        case Type.getList:
          return {
            ...state,
            isLoading: false,
            isSuccess: true,
            payload: action.payload,
            [MODEL_NAMES]: action.payload[MODEL_NAMES]
          }
        case Type.deleteList:
          return {
            ...state,
            isLoading: false,
            isSuccess: true,
            payload: {},
            [MODEL_NAMES]: []
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
        case Type.start:
          return {
            ...state,
            payload: {},
            isSuccess: null,
            isLoading: true
          }
        case Type.fail:
          return {
            ...state,
            payload: {},
            isSuccess: false,
            isLoading: false,
            error: action.payload.error
          }
        default:
          return null
      }
    };
    basicCases = (state = {}, action) => {
      const Type = this.getBasicTypes()
      const initState = this.initState
      switch (action.type) {
        case Type.setParams:
          return {
            ...state,
            params: { ...this.params, ...action.payload.params }
          }
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

        case Type.start:
          return {
            ...state,
            payload: {},
            isSuccess: null,
            isLoading: true
          }
        case Type.fail:
          return {
            ...state,
            payload: {},
            isSuccess: false,
            isLoading: false,
            error: action.payload.error
          }
        default:
          return null
      }
    };
    getPoweredReduxTypes = () => {
      const Types = this.getBasicTypes()
      const ModelBaseTypes = this.getModelBaseTypes()
      return { ...Types, ...ModelBaseTypes }
    };
    getBasicTypes = () => ({
      setParams: actionType(this.reducerName, 'setParams'),
      setValue: actionType(this.reducerName, 'setValue'),
      setInit: actionType(this.reducerName, 'setInit'),
      start: actionType(this.reducerName, 'async', 'start'),
      fail: actionType(this.reducerName, 'async', 'fail')
    });
    getModelBaseTypes = () => ({
      postList: actionType(this.reducerName, 'postList', 'post'),
      getList: actionType(this.reducerName, 'getList', 'get'),
      putListIds: actionType(this.reducerName, 'putListIds', 'put'),
      deleteList: actionType(this.reducerName, 'deleteList', 'delete'),
      postItem: actionType(this.reducerName, 'postItem', 'post'),
      getItem: actionType(this.reducerName, 'getItem', 'get'),
      putItem: actionType(this.reducerName, 'putItem', 'put'),
      deleteItem: actionType(this.reducerName, 'deleteItem', 'delete'),
      getItemSchema: actionType(this.reducerName, 'getItemSchema', 'get'),
      setItem: actionType(this.reducerName, 'setItem'),
      setList: actionType(this.reducerName, 'setList'),
      start: actionType(this.reducerName, 'async', 'start'),
      fail: actionType(this.reducerName, 'async', 'fail')
    });
}
