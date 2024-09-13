import { FastifyInstance } from "fastify";
import { ProductUseCase } from "../useCases/product.usecase";
import type { ProductCreate } from "../interfaces/product.interface";

export async function productRoutes(fastify: FastifyInstance) {
  const productUseCase = new ProductUseCase();
  fastify.post<{ Body: ProductCreate }>(
    "/",
    {
      schema: {
        description: "Create a product",
        tags: ["product"],
        summary: "Product operations",
        body: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Unique for each user",
            },
            description: {
              type: "string",
              description:
                "Can be empty and has a limit size of 500 characters",
            },
            price: {
              type: "number",
              description: "Cannot be empty and has to be a positive value",
            },
            stock: {
              type: "number",
              description: "Cannot be empty and has to be a positive value",
            },
          },
          required: ["name", "price", "stock"],
        },
      },
    },
    async (req, reply) => {
      const { name, description, price, stock } = req.body;

      try {
        const data = await productUseCase.createProduct({
          name,
          description,
          price,
          stock,
        });

        reply.send({ message: "Product was created successfuly!", data });
        return data;
      } catch (error) {
        reply.send(error);
      }
    }
  );

  fastify.get(
    "/",
    {
      schema: {
        description: "Return a list of all products",
        tags: ["product"],
        summary: "List all products",
        response: {
          200: {
            description: "List of products",
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "number",
                  description: "Unique identifier for the product",
                },
                name: { type: "string", description: "Name of the product" },
                description: {
                  type: "string",
                  description: "Description of the product",
                },
                price: { type: "number", description: "Price of the product" },
                stock: {
                  type: "number",
                  description: "Stock quantity of the product",
                },
              },
            },
          },
        },
      },
    },
    async (req, reply) => {
      try {
        const products = await productUseCase.listAllProducts();

        reply.send(products);
      } catch (error) {
        reply.send("Something went wrong, try again later!");
      }
    }
  );

  fastify.put<{
    Params: { id: string };
    Body: { name: string; description: string; price: number; stock: number };
  }>(
    "/:id",
    {
      schema: {
        description: "Update a product by its ID",
        tags: ["product"],
        summary: "Update product details",
        params: {
          type: "object",
          properties: {
            id: {
              type: "number",
              description: "Unique identifier for the product",
            },
          },
          required: ["id"],
        },
        body: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of the product",
            },
            description: {
              type: "string",
              description:
                "Description of the product, max length of 500 characters",
              maxLength: 500,
            },
            price: {
              type: "number",
              description: "Price of the product",
            },
            stock: {
              type: "number",
              description: "Stock quantity of the product",
            },
          },
        },
        response: {
          200: {
            description: "Product edited successfully",
            type: "object",
            properties: {
              id: {
                type: "number",
                description: "Unique identifier for the product",
              },
              name: {
                type: "string",
                description: "Product name",
              },
              description: {
                type: "string",
                description: "Product description",
              },
              price: {
                type: "number",
                description: "Product price",
              },
              stock: {
                type: "number",
                description: "Product stock quantity",
              },
            },
          },
        },
      },
    },
    async (req, reply) => {
      try {
        const { id } = req.params;
        const { name, description, price, stock } = req.body;
        const productId = parseInt(id, 10);

        const editProduct = await productUseCase.editProduct(productId, {
          name,
          description,
          price,
          stock,
        });

        reply.send(editProduct);

        return editProduct;
      } catch (error) {
        reply.send(error);
      }
    }
  );

  fastify.delete<{ Params: { id: string } }>(
    "/:id",
    {
      schema: {
        description: "Delete a product",
        tags: ["product"],
        summary: "Product operations",
        params: {
          type: "object",
          properties: {
            id: {
              type: "number",
              description: "Unique identifier for the product",
            },
          },
          required: ["id"],
        },
      },
    },
    async (req, reply) => {
      try {
        const { id } = req.params;
        const productId = parseInt(id, 10);
        const deletedProduct = await productUseCase.deleteProduct(productId);
        reply.send({
          message: "Product was deleted successfully",
          deletedProduct,
        });
        return deletedProduct;
      } catch (error) {}
    }
  );

  fastify.get<{ Params: { id: string } }>(
    "/:id",
    {
      schema: {
        description: "Retrieve a product by its ID",
        tags: ["product"],
        summary: "Get product by ID",
        params: {
          type: "object",
          properties: {
            id: {
              type: "number",
              description: "Unique identifier for the product",
            },
          },
          required: ["id"],
        },
        response: {
          200: {
            description: "Product retrieved successfully",
            type: "object",
            properties: {
              id: {
                type: "number",
                description: "Unique identifier for the product",
              },
              name: { type: "string", description: "Name of the product" },
              description: {
                type: "string",
                description: "Description of the product",
              },
              price: { type: "number", description: "Price of the product" },
              stock: {
                type: "number",
                description: "Stock quantity of the product",
              },
            },
          },
        },
      },
    },
    async (req, reply) => {
      try {
        const { id } = req.params;
        const productId = parseInt(id, 10);

        const product = await productUseCase.findById(productId);

        reply.send(product);
        return product;
      } catch (error) {
        reply.send(error);
      }
    }
  );
}
