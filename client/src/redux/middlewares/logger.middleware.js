import { createLogger } from 'redux-logger'

const loggerMiddleware = createLogger({
  collapsed: true,
  duration: true,
  timestamp: true,
  // titleFormatter: true
  diff: true,
  diffPredicate: true
})

export default loggerMiddleware
