import ActionType from './ActionType'

const SyncTypes = (actionName) => ({
  setValue: ActionType(actionName, 'setValue'),
  setItem: ActionType(actionName, 'setItem'),
  setList: ActionType(actionName, 'setList'),
  setInit: ActionType(actionName, 'setInit'),
  start: ActionType(actionName, 'request', 'start'),
  fail: ActionType(actionName, 'rquest', 'fail')
})

export default SyncTypes
