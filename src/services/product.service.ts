import connection from '../models/connection';
import ProductModel from '../models/product.model';
import { IProduct } from '../interfaces/index';

class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async getAll() {
    const products = await this.model.getAll();
    return products;
  }

  public async createProduct(product: IProduct) {
    const { name, amount } = product;
    const result = await this.model.createProduct({ name, amount });
    return result;
  }
}

export default ProductService;