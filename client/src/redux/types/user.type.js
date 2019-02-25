import AsyncTypes from './Types/AsyncTypes'
import SyncTypes from './Types/SyncTypes'

const ACTION_NAME = 'user'
const asyncTypes = AsyncTypes(ACTION_NAME)
const syncTypes = SyncTypes(ACTION_NAME)
const type = { ...asyncTypes, ...syncTypes }
export default type
