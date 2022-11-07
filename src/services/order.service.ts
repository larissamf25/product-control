import connection from '../models/connection';
import OrderModel from '../models/order.model';
import UserModel from '../models/user.model';
import ProductModel from '../models/product.model';

class OrderService {
  public model: OrderModel;

  public userModel: UserModel;
  
  public productModel: ProductModel;

  constructor() {
    this.model = new OrderModel(connection);
    this.userModel = new UserModel(connection);
    this.productModel = new ProductModel(connection);
  }

  public async getAll() {
    const orders = await this.model.getAll();
    return orders;
  }

  public async createOrder(productsIds: number[], username: string) {
    const user = await this.userModel.getById(username);
    const userId = user.id;

    const order = await this.model.createOrder(userId);
    console.log(order);

    const products = await this.productModel.getById(productsIds);
    console.log(products.length);
    await Promise.all(products.map((product) => (
      this.productModel.createProductOrder(product.name, product.amount, order)
    )));
    return { userId, productsIds };
  }
}

export default OrderService;