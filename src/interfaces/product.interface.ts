export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
}

export interface ProductCreate {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface ProductRepository {
  createProduct(data: ProductCreate): Promise<Product>;
  listAllProducts(): Promise<Product[]>;
  editProduct(id: number, data: ProductCreate): Promise<Product>;
  deleteProduct(id: number): Promise<Product>;
  findById(id: number): Promise<Product | null>;
}
