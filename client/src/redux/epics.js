import { combineEpics } from 'redux-observable'
import { pingEpic } from './epics/ping.epic'

export default combineEpics(pingEpic)
