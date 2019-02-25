import PoweredRedux from '../../lib/PoweredRedux'

export const REDUCER_NAME = 'global'
const MODEL_NAME = REDUCER_NAME
export const initState = {
  isLoading: false,
  name: REDUCER_NAME,
  modelName: MODEL_NAME,
  payload: {},
  params: { langauge: 'en', isHybrid: false, size: 'desktop' },
  error: {}
}
export const poweredRedux = new PoweredRedux(REDUCER_NAME, MODEL_NAME, initState)
const type = poweredRedux.getBasicTypes()
export default type
