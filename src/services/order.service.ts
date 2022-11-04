import connection from '../models/connection';
import OrderModel from '../models/order.model';

class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public async getAll() {
    const orders = await this.model.getAll();
    return orders;
  }

  public async createOrder(productsIds: number[]) {
    const product = await this.model.createOrder(productsIds);
    return product;
  }
}

export default OrderService;