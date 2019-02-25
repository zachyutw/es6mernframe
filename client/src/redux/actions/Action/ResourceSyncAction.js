import SyncTypes from '../../types/Types/SyncTypes'
export const set = (type, payload) => ({ type, payload })
const ResourceSyncAction = (actionName) => {
  const resourceAction = {}
  const syncType = SyncTypes(actionName)
  resourceAction.setValue = ({ name, value }) => (dispatch) => dispatch(set(syncType['setValue'], { name, value }))
  resourceAction.setItem = (payload) => (dispatch) => dispatch(set(syncType['setItem'], payload))
  resourceAction.setList = (payload) => (dispatch) => dispatch(set(syncType['setList'], payload))
  resourceAction.setInit = () => (dispatch) => dispatch(set(syncType['setInit'], {}))
  resourceAction.start = () => (dispatch) => dispatch(set(syncType['start'], {}))
  resourceAction.fail = (error) => (dispatch) => dispatch(set(syncType['fail'], { error }))

  return resourceAction
}

export default ResourceSyncAction
