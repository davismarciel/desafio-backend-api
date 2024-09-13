import fastify, { FastifyInstance } from "fastify";
import { productRoutes } from "./routes/product.route";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

const app: FastifyInstance = fastify();

app.register(fastifySwagger, {
  openapi: {
    openapi: "3.0.0",
    info: {
      title: "CRUD de produtos",
      description:
        "API para realizar operações CRUD sobre uma linha de produtos",
      version: "0.1.0",
    },
    servers: [
      {
        url: "http://localhost:3001/products",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        apiKey: {
          type: "apiKey",
          name: "apiKey",
          in: "header",
        },
      },
    },
  },
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next();
    },
    preHandler: function (request, reply, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});

app.register(productRoutes, {
  prefix: "/products",
});

app.listen({ port: 3001 ?? process.env.PORT }, () => {
  console.log(`Server listening at http://localhost:3001`);
});
