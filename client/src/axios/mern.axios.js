import axios from 'axios'

const mernUrl = 'http://localhost:5000/api'

const mernInstance = axios.create({ baseURL: mernUrl })

export default mernInstance
