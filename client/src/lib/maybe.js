export default (data) => {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}
