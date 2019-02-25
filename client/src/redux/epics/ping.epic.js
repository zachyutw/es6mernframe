import { mapTo, delay } from 'rxjs/operators'
import { ofType } from 'redux-observable'
export const PING = 'PING'
export const PONG = 'PONG'
export const pingEpic = (action$) => action$.pipe(ofType(PING), delay(1000), mapTo({ type: PONG }))
