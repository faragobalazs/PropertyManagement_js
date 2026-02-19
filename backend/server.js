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
        summary: "List all buildings",
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

fastify.register(async function (instance) {
  instance.post(
    "/tenants",
    {
      schema: {
        summary: "Create a new tenant",
        description: "Create a new tenant",
        body: {
          type: "object",
          required: ["name", "sqm"],
          properties: {
            name: { type: "string" },
            building: { type: "string" },
            level: { type: "integer" },
            number: { type: "integer" },
            sqm: { type: "number" },
          },
        },
      },
    },
    async (request, reply) => {
      const tenants = await prisma.tenants.create({
        data: request.body,
      });
      return tenants;
    },
    instance.get(
      "/tenants",
      {
        schema: {
          summary: "List all tenants",
          description: "List all tenants",
          response: {
            200: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "integer" },
                  name: { type: "string" },
                  building: { type: "string" },
                  level: { type: "integer" },
                  number: { type: "integer" },
                  sqm: { type: "number" },
                },
              },
            },
          },
        },
      },
      async (request, reply) => {
        const tenants = await prisma.tenants.findMany();
        return tenants;
      },
    ),
  );
});

fastify.register(async function (instance) {
  instance.post(
    "/electricity",
    {
      schema: {
        summary: "Create electricity meter standing",
        description: "Create electricity meter standing",
        body: {
          type: "object",
          required: ["name", "date", "meter"],
          properties: {
            name: { type: "string" },
            building: { type: "string" },
            date: { type: "string" },
            meter: { type: "number" },
          },
        },
      },
    },
    async (request, reply) => {
      const electricity = await prisma.electricity.create({
        data: request.body,
      });
      return electricity;
    },
  );
  instance.get(
    "/electricity",
    {
      schema: {
        summary: "List electricity consumption",
        description: "List electricity consumption",
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                building: { type: "string" },
                date: { type: "string" },
                meter: { type: "number" },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const electricity = await prisma.electricity.findMany();
      return electricity;
    },
  );
});

fastify.register(async function (instance) {
  instance.post(
    "/heating",
    {
      schema: {
        summary: "Create heating meter standing",
        description: "Create heating meter standing",
        body: {
          type: "object",
          required: ["name", "date", "meter"],
          properties: {
            name: { type: "string" },
            building: { type: "string" },
            date: { type: "string" },
            meter: { type: "number" },
          },
        },
      },
    },
    async (request, reply) => {
      const heating = await prisma.heating.create({
        data: request.body,
      });
      return heating;
    },
  );
  instance.get(
    "/heating",
    {
      schema: {
        summary: "List heating consumption",
        description: "List heating consumption",
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                building: { type: "string" },
                date: { type: "string" },
                meter: { type: "number" },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const heating = await prisma.heating.findMany();
      return heating;
    },
  );
});

const start = async () => {
  await fastify.ready();
  await fastify.listen({ port: 3000, host: "localhost" });
  console.log(`Server is listening on port: ${PORT}.`);
  console.log("http://localhost:3000/docs");
};

fastify.register(async function (instance) {
  instance.post(
    "/water",
    {
      schema: {
        summary: "Create water meter standing",
        description: "Create water meter standing",
        body: {
          type: "object",
          required: ["name", "date", "meter"],
          properties: {
            name: { type: "string" },
            building: { type: "string" },
            date: { type: "string" },
            meter: { type: "number" },
          },
        },
      },
    },
    async (request, reply) => {
      const water = await prisma.water.create({
        data: request.body,
      });
      return water;
    },
  );
  instance.get(
    "/water",
    {
      schema: {
        summary: "List water consumption",
        description: "List water consumption",
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                building: { type: "string" },
                date: { type: "string" },
                meter: { type: "number" },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const water = await prisma.water.findMany();
      return water;
    },
  );
});

start();
