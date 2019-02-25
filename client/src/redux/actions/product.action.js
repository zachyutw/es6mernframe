import Product from '../types/product.type'
import ResourceAsyncAction from './Action/ResourceAsyncAction'
import ResourceSyncAction from './Action/ResourceSyncAction'
import { baseUrl } from '../../config'

export const Type = Product
const ACATION_NAME = 'product'
const resourcesAsyncAction = ResourceAsyncAction(ACATION_NAME, baseUrl)
const resourcesSyncAction = ResourceSyncAction(ACATION_NAME)
let action = { ...resourcesAsyncAction, ...resourcesSyncAction }
export default action
