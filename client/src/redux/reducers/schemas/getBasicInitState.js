export default (modelName) => ({
  isLoading: false,
  model: modelName,
  payload: {},
  [modelName]: {},
  [`${modelName}s`]: [],
  error: {}
})
