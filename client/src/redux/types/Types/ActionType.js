const ActionType = (actionName, name, method = 'set') => {
  return actionName + '/' + name + '_' + method
}

export default ActionType
