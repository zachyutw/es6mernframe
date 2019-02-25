import { PING, PONG } from '../epics/ping.epic'
const initState = {
  isPinging: false
}

export const ping = (state = initState, action) => {
  switch (action.type) {
    case PING:
      return { isPinging: true }

    case PONG:
      return { isPinging: false }

    default:
      return state
  }
}
