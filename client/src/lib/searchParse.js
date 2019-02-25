const searchPase = {
  parse: (search) => {
    console.log(search[0])
    if (search[0] !== '?') {
      return {}
    }
    const urlQuery = search.substr(1)
    return JSON.parse('{"' + urlQuery.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) {
      return key === '' ? value : decodeURIComponent(value)
    })
  }
}

export default searchPase
