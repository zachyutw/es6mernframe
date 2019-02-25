import { poweredRedux } from '../types/global.type'
import { GeoJsonPoint, currentPostion } from '../../lib/position'
let action = poweredRedux.basicActions()
export const setGPS = () => (dispatch) => {
  dispatch(action.start())
  currentPostion({
    enableHighAccuracy: false,
    timeout: 6000,
    maximumAge: 10000
  })
    .then((position) => {
      dispatch(
        action.setValue({
          name: 'gps',
          value: GeoJsonPoint({ name: 'gps' }, [ position.coords.latitude, position.coords.longitude ])
        })
      )
    })
    .catch((error) => {
      dispatch(action.fail(error))
    })
}

action.setGPS = setGPS
export default action
