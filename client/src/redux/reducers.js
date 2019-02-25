import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { ping } from './reducers/ping.reducer'

import auth from './reducers/auth.reducer'
import user from './reducers/user.reducer'
import product from './reducers/product.reducer'
import global from './reducers/global.reducer'
export default combineReducers({
  form: formReducer,
  ping,
  product,
  auth,
  user,
  global
})
