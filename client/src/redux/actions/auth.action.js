import Auth from '../types/auth.type'
import ResourceAsyncAction from './Action/ResourceAsyncAction'
import ResourceSyncAction from './Action/ResourceSyncAction'
import { baseUrl } from '../../config'

export const Type = Auth
const ACATION_NAME = 'auth'
const resourcesAsyncAction = ResourceAsyncAction(ACATION_NAME, baseUrl)
const resourcesSyncAction = ResourceSyncAction(ACATION_NAME)
let action = { ...resourcesAsyncAction, ...resourcesSyncAction }
export default action
