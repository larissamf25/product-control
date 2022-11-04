import connection from '../models/connection';
import ProductModel from '../models/product.model';

class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async getAll() {
    const products = await this.model.getAll();
    return products;
  }

  public async createProduct(name: string, amount: number) {
    const product = await this.model.createProduct(name, amount);
    return product;
  }
}

export default ProductService;