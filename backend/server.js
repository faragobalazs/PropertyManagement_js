import Fastify from "fastify";

/**
 * @type {import("fastify").FastifyInstance}
 */

const fastify = Fastify({
    logger: true
})

fastify.get("/", function (request, reply) {
    reply.send({hello: "world"})
})

fastify.get("/properties", function (request, reply) {
    reply.send({hello: "properties"})
})

fastify.get("/manager", function (request, reply) {
    reply.send({hello: "manager"})
})


fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})