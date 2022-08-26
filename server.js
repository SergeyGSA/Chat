const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./src/DB/db.json')
const middlewares = jsonServer.defaults()
const PORT = process.env.PORT || 3000

server.use(jsonServer.json())
server.use(middlewares)
server.use(router)

server.listen(PORT, () => console.log('Server has been started...'))
