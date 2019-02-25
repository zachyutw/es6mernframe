import axios from 'axios'
import _ from 'lodash'
import AsyncTypes from '../../types/Types/AsyncTypes'
import SyncTypes from '../../types/Types/SyncTypes'
import { set } from './ResourceSyncAction'

export const start = (type) => ({ type })
export const fail = (type, error) => ({ type, payload: { error } })

const ResourceAsyncAction = (actionName, baseUrl = '', urlMapping = {}, client) => {
  let resourceAction = {}
  const axiosClient = client || axios
  const asyncType = AsyncTypes(actionName)
  const syncType = SyncTypes(actionName)

  resourceAction.postItem = ({ data, params }) => {
    const name = 'postItem'
    const apiUrl = !_.isEmpty(urlMapping[name]) ? urlMapping[name] : `${baseUrl}`
    const URL = `${apiUrl}/${actionName}/Item`
    return (dispatch) => {
      dispatch(start(syncType.start))
      axiosClient
        .post(URL, data, { params })
        .then((res) => {
          dispatch(set(asyncType[name], res.data))
        })
        .catch((error) => {
          dispatch(fail(syncType.fail, error))
        })
    }
  }
  resourceAction.getItem = ({ id, params }) => {
    const name = 'getItem'
    const apiUrl = !_.isEmpty(urlMapping[name]) ? urlMapping[name] : `${baseUrl}`
    const URL = `${apiUrl}/${actionName}/Item/${id}`
    return (dispatch) => {
      dispatch(start(syncType.start))
      axiosClient
        .get(URL, { params })
        .then((res) => {
          dispatch(set(asyncType[name], res.data))
        })
        .catch((error) => {
          dispatch(fail(syncType.fail, error))
        })
    }
  }
  resourceAction.putItem = ({ id, data, params }) => {
    const name = 'putItem'

    const apiUrl = !_.isEmpty(urlMapping[name]) ? urlMapping[name] : `${baseUrl}`
    const URL = `${apiUrl}/${actionName}/Item/${id}`
    return (dispatch) => {
      dispatch(start(syncType.start))
      axiosClient
        .put(URL, data, { params })
        .then((res) => {
          dispatch(set(asyncType[name], res.data))
        })
        .catch((error) => {
          dispatch(fail(syncType.fail, error))
        })
    }
  }
  resourceAction.deleteItem = ({ id }) => {
    const name = 'deleteItem'

    const apiUrl = !_.isEmpty(urlMapping[name]) ? urlMapping[name] : `${baseUrl}`
    const URL = `${apiUrl}/${actionName}/Item/${id}`
    return (dispatch) => {
      dispatch(start(syncType.start))
      axiosClient
        .delete(URL)
        .then((res) => {
          dispatch(set(asyncType[name], res.data))
        })
        .catch((error) => {
          dispatch(fail(syncType.fail, error))
        })
    }
  }
  resourceAction.getItemSchema = () => {
    const name = 'getItemSchema'

    const apiUrl = !_.isEmpty(urlMapping[name]) ? urlMapping[name] : `${baseUrl}`
    const URL = `${apiUrl}/${actionName}/Item/schema`
    return (dispatch) => {
      dispatch(start(syncType.start))
      axiosClient
        .get(URL)
        .then((res) => {
          dispatch(set(asyncType[name], res.data))
        })
        .catch((error) => {
          dispatch(fail(syncType.fail, error))
        })
    }
  }
  resourceAction.postList = ({ data, params }) => {
    const name = 'postList'

    const apiUrl = !_.isEmpty(urlMapping[name]) ? urlMapping[name] : `${baseUrl}`
    const URL = `${apiUrl}/${actionName}/list`
    return (dispatch) => {
      dispatch(start(syncType.start))
      axiosClient
        .post(URL, data, { params })
        .then((res) => {
          dispatch(set(asyncType[name], res.data))
        })
        .catch((error) => {
          dispatch(fail(syncType.fail, error))
        })
    }
  }
  resourceAction.putListIds = ({ ids, params }) => {
    const name = 'putListIds'

    const apiUrl = !_.isEmpty(urlMapping[name]) ? urlMapping[name] : `${baseUrl}`
    const URL = `${apiUrl}/${actionName}/list/ids`
    return (dispatch) => {
      dispatch(start(syncType.start))
      axiosClient
        .put(URL, { ids }, { params })
        .then((res) => {
          dispatch(set(asyncType[name], res.data))
        })
        .catch((error) => {
          dispatch(fail(syncType.fail, error))
        })
    }
  }
  resourceAction.getList = ({ params }) => (dispatch) => {
    const name = 'getList'
    const apiUrl = !_.isEmpty(urlMapping[name]) ? urlMapping[name] : `${baseUrl}`
    const URL = `${apiUrl}/${actionName}/list`
    dispatch(start(syncType.start))
    axiosClient
      .get(URL, { params })
      .then((res) => {
        dispatch(set(asyncType[name], res.data))
      })
      .catch((error) => {
        dispatch(fail(syncType.fail, error))
      })
  }
  resourceAction.deleteList = () => (dispatch) => {
    const name = 'deleteList'
    const apiUrl = !_.isEmpty(urlMapping[name]) ? urlMapping[name] : `${baseUrl}`
    const URL = `${apiUrl}/${actionName}/list`

    dispatch(start(syncType.start))
    axiosClient
      .delete(URL)
      .then((res) => {
        dispatch(set(asyncType[name], res.data))
      })
      .catch((error) => {
        dispatch(fail(syncType.fail, error))
      })
  }

  return resourceAction
}

export default ResourceAsyncAction
