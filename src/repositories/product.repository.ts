import { prisma } from "../database/prisma";
import type {
  Product,
  ProductCreate,
  ProductRepository,
} from "../interfaces/product.interface";

export default class ProductRepositoryPrisma implements ProductRepository {
  // Criando um produto
  async createProduct(data: ProductCreate): Promise<Product> {
    const newProduct = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
      },
    });

    return newProduct;
  }

  // Retornando uma lista de produtos
  async listAllProducts(): Promise<Product[]> {
    return await prisma.product.findMany({
      orderBy: {
        id: "asc",
      },
    });
  }

  // Editando um produto pelo id
  async editProduct(id: number, data: ProductCreate): Promise<Product> {
    const editProduct = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
      },
    });
    return editProduct;
  }

  // Deletando um produto pelo id
  async deleteProduct(id: number): Promise<Product> {
    return await prisma.product.delete({
      where: {
        id,
      },
    });
  }

  // Encontrando um produto pelo id
  async findById(id: number): Promise<Product | null> {
    const product = await prisma.product.findFirst({
      where: {
        id,
      },
    });

    return product;
  }
}
