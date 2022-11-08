import connection from '../models/connection';
import OrderModel from '../models/order.model';
import UserModel from '../models/user.model';
import ProductModel from '../models/product.model';
import { IOrder } from '../interfaces/index';

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

  public async createOrder(order: IOrder) {
    const { productsIds, username } = order;
    const user = await this.userModel.getById(username);
    if (!user.id) return null;
    const userId = user.id;

    const newOrder = await this.model.createOrder(userId);

    await Promise.all(productsIds.map((id) => (
      this.productModel.createProductOrder(id, newOrder)
    )));
    return { userId, productsIds };
  }
}

export default OrderService;