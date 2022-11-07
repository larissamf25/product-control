import { Request, Response } from 'express';
import Joi from 'joi';
import statusCodes from '../statusCode';
import OrderService from '../services/order.service';

/* interface TypedRequestBody extends Request {
  body: { username: string, productsIds: number[] },
} */

class OrderController {
  constructor(private orderService = new OrderService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.orderService.getAll();
    res.status(statusCodes.OK).json(orders);
  };

  public createOrder = async (req: Request, res: Response) => {
    const { productsIds, username } = req.body;
    if (!productsIds) {
      return res.status(statusCodes.BAD_REQUEST).json({ message: '"productsIds" is required' });
    }

    const schema = Joi.array().items(Joi.number()).min(1).required()
      .messages({
        'array.base': '"productsIds" must be an array',
        'array.min': '"productsIds" must include only numbers',
      });
    const { error } = schema.validate(productsIds);
    if (error) return res.status(statusCodes.INCORRECT).json({ message: error.message });

    const order = await this.orderService.createOrder(productsIds, username);
    res.status(statusCodes.CREATED).json(order);
  };
}

export default OrderController;