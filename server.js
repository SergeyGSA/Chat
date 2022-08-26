const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./src/DB/db.json')
const middlewares = jsonServer.defaults()
const PORT = process.env.PORT || 3000

server.use(middlewares)
server.use(router)

server.get('/', (req, res) => {
  res.header('"Content-Type","application/json"')
  res.send(JSON.stringify(router))
})

server.listen(PORT, () => console.log('Server has been started...'))

// const data = require('./db.json')

// const jsonServer = require('json-server')
// const server = jsonServer.create()
// const router = jsonServer.router(data)
// const middlewares = jsonServer.defaults()
// const PORT = 3000

// server.use(middlewares)
// server.use(router)
// server.listen(PORT, () => console.log('Server has been started...'))
