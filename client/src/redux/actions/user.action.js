import User from '../types/user.type'
import ResourceAsyncAction from './Action/ResourceAsyncAction'
import ResourceSyncAction from './Action/ResourceSyncAction'
import { baseUrl } from '../../config'

export const Type = User
const ACATION_NAME = 'user'
const resourcesAsyncAction = ResourceAsyncAction(ACATION_NAME, baseUrl)
const resourcesSyncAction = ResourceSyncAction(ACATION_NAME)
let action = { ...resourcesAsyncAction, ...resourcesSyncAction }
export default action
