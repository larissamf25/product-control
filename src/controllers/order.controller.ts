import { Request, Response } from 'express';
import statusCodes from '../statusCode';
import OrderService from '../services/order.service';
import validateOrder from './validations/validateOrder';

class OrderController {
  constructor(private orderService = new OrderService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.orderService.getAll();
    return res.status(statusCodes.OK).json(orders);
  };

  public createOrder = async (req: Request, res: Response) => {
    const { productsIds, username } = req.body;
    if (!productsIds) {
      return res.status(statusCodes.BAD_REQUEST).json({ message: '"productsIds" is required' });
    }

    const error = validateOrder(productsIds);
    if (error) return res.status(statusCodes.INCORRECT).json({ message: error.message });

    const order = await this.orderService.createOrder({ productsIds, username });
    return res.status(statusCodes.CREATED).json(order);
  };
}

export default OrderController;