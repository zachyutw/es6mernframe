export const GeoJsonPoint = (data, coordinates) => {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates
    },
    properties: {
      ...data
    }
  }
}

export const currentPostion = (options) => {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
}
