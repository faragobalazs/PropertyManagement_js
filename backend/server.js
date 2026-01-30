import "dotenv/config";
import Fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import pkg from "@prisma/client";

const { PrismaClient } = pkg;
const prisma = new PrismaClient()
const fastify = Fastify({logger: true})

const PORT = 3000;

fastify.register(swagger, {
    swagger: {
        info: {
            title: "Property Manager",
            description: "Building management",
            version: "0.1"
        },
        host: "localhost: 3000",
        schemes: ["http"],
        consumes: ["application/json"],
        produces: ["application/json"]
    }
})

fastify.register(swaggerUi, {
    routePrefix: '/docs'
})


fastify.post("/buildings", {
    schema: {
        description: "Create a new building",
        body: {
            type: "object",
            required: ["name", "address"],
            properties: {
                name: { type: "string"},
                address: { type: "string"},
                year: {type: "integer"},
                levels: {type: "integer"},
                webpage: { type: "string"},
                email: { type: "string"},
                phone: { type: "string"}
            }
        }
    }
}, async (request, reply) => {
    const building = await prisma.building.create({
        data: request.body     
    }); 
    return building;
});

fastify.get("/buildings", {
    schema: {
        description: "List all buildings",
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        name: { type: "string" },
                        address: { type: "string" },
                        year: { type: "integer" },
                        levels: { type: "integer" },
                        webpage: { type: "string" },
                        email: { type: "string" },
                        phone: { type: "string" },
                        createdAt: { type: "string" },
                        updatedAt: { type: "string" }
                    }
                }
            }
        }
    }
}, async (request, reply) => {
    const buildings = await prisma.building.findMany();
    return buildings;
});

const start = async() => {
    await fastify.ready();
    await fastify.listen({ port: 3000, host: "localhost" });
    console.log(`Server is listening on port: ${PORT}.`);
}

start()