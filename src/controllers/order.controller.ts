import { Request, Response } from 'express';
import statusCodes from '../statusCode';
import OrderService from '../services/order.service';

class OrderController {
  constructor(private orderService = new OrderService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.orderService.getAll();
    res.status(statusCodes.OK).json(orders);
  };

  public createOrder = async (req: Request, res: Response) => {
    const { productsIds } = req.body;
    const order = await this.orderService.createOrder(productsIds);
    res.status(statusCodes.CREATED).json(order);
  };
}

export default OrderController;