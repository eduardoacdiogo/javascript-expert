const { once } = require('events')
const http = require('http')

const DEFAULT_USER = {
  username: 'John Doe',
  password: 'password'
}

const routes = {
  '/contact:get': (request, response) => {
    response.write('contact us page')
    return response.end()
  },

  /**
   * * to call this method you need run in your terminal the line below
   * ! this will pass
   * ? curl -i -X POST --data '{"username": "John Doe", "password": "password"}' localhost:3000/login
   * ! this wont pass
   * ? curl -i -X POST --data '{"username": "John Doe", "password": "password2"}' localhost:3000/login
   */
  '/login:post': async (request, response) => {
    const user = JSON.parse(await once(request, 'data'))
    const toLower = (text) => text.toLowerCase() 
    if (toLower(user.username) !== toLower(DEFAULT_USER.username) || toLower(user.password) !== toLower(DEFAULT_USER.password)) {
      response.writeHeader(401)
      response.end('Logging failed!')
      return
    }
    return response.end('Log in succeeded')
  },
  default( request, response ) {
    response.writeHeader(404)
    return response.end('not found!')
  }
}

function handler(request, response) {
  const { url, method } = request
  const routerKey = `${url.toLowerCase()}:${method.toLowerCase()}`
  const chosen = routes[routerKey] || routes.default
  return chosen(request, response)
}

const app = http.createServer(handler).listen(3000, () => console.log('running at 3000'))

module.exports = app