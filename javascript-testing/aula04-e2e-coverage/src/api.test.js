const assert = require('assert');
const { describe, it, before, after } = require('mocha')
const supertest = require('supertest')

describe('API Suite test', () => {
  let app
  before((done) => {
    app = require('./api')
    app.once('listening', done)
  })
  
  after((done) => app.close(done))

  describe('/contact:get', () => { 
    it('should request the contact route and return HTTP Status 200', async () => {
      const response = await supertest(app).get('/contact').expect(200)
      
      assert.strictEqual(response.text, 'contact us page')
    })
  })
  describe('/login:post', () => { 
    it('should request the login route and return HTTP Status 200', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({
          username: 'John Doe',
          password: 'password'
        })
        .expect(200)
      
      assert.strictEqual(response.text, 'Log in succeeded')
    })
    it('should request the login route and return HTTP Status 401', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({
          username: 'Smith',
          password: 'password'
        })
        .expect(401)
      
      assert.ok(response.unauthorized)
      assert.strictEqual(response.text, 'Logging failed!')
    })
  })
  describe('/not-found:get - 404', () => { 
    it('should request and existing page and return HTTP Status 200', async () => {
      const response = await supertest(app).get('/not-found').expect(404)
      
      assert.strictEqual(response.text, 'not found!')
    })
  })
})