import axios from 'axios'
import getSyncType from '../../types/Types/SyncTypes'
const RequestAction = ({ client, url = '', id, method, params, data, actionType, actionName }) => (dispatch) => {
  const axiosClient = client || axios
  const _url = id ? url + '/' + id : url
  const syncType = getSyncType(actionName)
  dispatch(() => ({ type: syncType.start }))
  axiosClient
    .request({
      url: _url,
      method,
      params,
      data
    })
    .then((res) => {
      dispatch(() => ({ type: actionType, payload: res.data }))
    })
    .catch((error) => {
      dispatch(() => ({ type: syncType.faile, payload: { error } }))
    })
}

export default RequestAction
