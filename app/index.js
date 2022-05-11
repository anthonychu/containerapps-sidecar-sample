const fastify = require('fastify')()
const path = require('path')
const fs = require('fs')
const fetch = require('node-fetch')

const writePath = process.env.WRITE_PATH
const sidecarPort = process.env.SIDECAR_PORT || 3001

console.log('WRITE_PATH:', writePath)
console.log('SIDECAR_PORT:', sidecarPort)

fastify
  .get('/hello', async (request, reply) => {
    const response = await fetch(`http://localhost:${sidecarPort}/hello`)
    const json = await response.json()
    reply.send(json)
  })
  .get('/writefile', (request, reply) => {
    const guid = require('uuid').v4()
    const filePath = path.join(writePath, guid)
    console.log('writing file', filePath)
    fs.writeFile(filePath, '', () => {})
    reply.send({ message: `wrote file: ${filePath}` })
  })
  .register(require('@fastify/static'), {
    root: path.join(__dirname, 'public')
  })
  .listen(process.env.PORT || 3000, '0.0.0.0', err => {
    if (err) throw err
  })