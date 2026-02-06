import "dotenv/config";
import Fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import cors from "@fastify/cors";
import pkg from "@prisma/client";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const fastify = Fastify({ logger: true });

await fastify.register(cors, {
  origin: true,
});

const PORT = 3000;

fastify.register(swagger, {
  openapi: {
    openapi: "3.0.0",
    info: {
      title: "Property Manager",
      description: "Property management",
      version: "0.1",
    },
    servers: [{ url: "http://localhost:3000", description: "Development" }],
  },
});

fastify.register(swaggerUi, {
  routePrefix: "/docs",
});

fastify.register(async function (instance) {
  instance.post(
    "/buildings",
    {
      schema: {
        summary: "Create a new building",
        description: "Create a new building",
        body: {
          type: "object",
          required: ["name", "address"],
          properties: {
            name: { type: "string" },
            address: { type: "string" },
            architect: { type: "string" },
            owner: { type: "string" },
            year: { type: "integer" },
            levels: { type: "integer" },
            webpage: { type: "string" },
            email: { type: "string" },
            phone: { type: "string" },
          },
        },
      },
    },
    async (request, reply) => {
      const building = await prisma.building.create({
        data: request.body,
      });
      return building;
    },
  );
  instance.get(
    "/buildings",
    {
      schema: {
        summary: "list all buildings",
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
                architect: { type: "string" },
                owner: { type: "string" },
                year: { type: "integer" },
                levels: { type: "integer" },
                webpage: { type: "string" },
                email: { type: "string" },
                phone: { type: "string" },
                createdAt: { type: "string" },
                updatedAt: { type: "string" },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const buildings = await prisma.building.findMany();
      return buildings;
    },
  );
});

const start = async () => {
  await fastify.ready();
  await fastify.listen({ port: 3000, host: "localhost" });
  console.log(`Server is listening on port: ${PORT}.`);
  console.log("http://localhost:3000/docs");
};

start();
