import mernAxios from '../../axios/mern.axios'

export default (store) => (next) => (action) => {
  mernAxios.defaults.headers.common['Authorization'] = '123'
  // console.log(store.getState());
  return next(action)
}
