const { watch } = require('fs')

const folderToWatch = process.env.WATCH_FOLDER || __dirname

watch(folderToWatch, { recursive: false }, (eventType, filename) => {
  console.log(`${eventType} - ${filename}`)
})

const fastify = require('fastify')({
  logger: true
})

fastify.get('/hello', (request, reply) => {
  reply.send({ message: 'hello from sidecar' })
})

fastify.listen(process.env.PORT || 3001, '0.0.0.0', (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})