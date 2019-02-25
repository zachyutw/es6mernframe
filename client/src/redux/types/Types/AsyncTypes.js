import ActionType from './ActionType'

const AsyncTypes = (actionName) => ({
  postList: ActionType(actionName, 'postList', 'post'),
  getList: ActionType(actionName, 'getList', 'get'),
  putListIds: ActionType(actionName, 'putListIds', 'put'),
  deleteList: ActionType(actionName, 'deleteList', 'delete'),
  postItem: ActionType(actionName, 'postItem', 'post'),
  getItem: ActionType(actionName, 'getItem', 'get'),
  putItem: ActionType(actionName, 'putItem', 'put'),
  deleteItem: ActionType(actionName, 'deleteItem', 'delete'),
  getItemSchema: ActionType(actionName, 'getItemSchema', 'get')
})

export default AsyncTypes
