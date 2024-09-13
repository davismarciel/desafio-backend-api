import type {
  Product,
  ProductCreate,
  ProductRepository,
} from "../interfaces/product.interface";

import ProductRepositoryPrisma from "../repositories/product.repository";
export class ProductUseCase {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepositoryPrisma();
  }

  async createProduct({
    name,
    description,
    price,
    stock,
  }: ProductCreate): Promise<Product> {
    if (!price || price < 0) {
      throw new Error("Price cannot be empty or a negative value");
    }

    if (!stock || stock < 0) {
      throw new Error("Stock cannot be empty or a negative value");
    }

    if (description.length > 500) {
      throw new Error("Description cannot be longer than 500 characters");
    }
    const newProduct = await this.productRepository.createProduct({
      name,
      description,
      price,
      stock,
    });

    return newProduct;
  }

  async listAllProducts() {
    const product = await this.productRepository.listAllProducts();

    return product;
  }

  async editProduct(id: number, product: ProductCreate): Promise<Product> {
    return await this.productRepository.editProduct(id, product);
  }

  async deleteProduct(id: number): Promise<Product> {
    return await this.productRepository.deleteProduct(id);
  }

  async findById(id: number) {
    const productId = await this.productRepository.findById(id);
    if (!productId) {
      throw new Error("ID does not exist!");
    }
    return productId;
  }
}
