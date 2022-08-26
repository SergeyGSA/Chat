const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./src/DB/db.json')
const middlewares = jsonServer.defaults({static: './build'})
const PORT = 3000
server.use(middlewares)
server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
  })
)
server.use(router)
server.listen(PORT, () => console.log('Server has been started...'))
