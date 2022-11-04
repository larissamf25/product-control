import { Request, Response } from 'express';
import Joi from 'joi';
import statusCodes from '../statusCode';
import ProductService from '../services/product.service';

class ProductController {
  constructor(private productService = new ProductService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const products = await this.productService.getAll();
    res.status(statusCodes.OK).json(products);
  };

  public createProduct = async (req: Request, res: Response) => {
    const schema1 = Joi.object({
      name: Joi.required(),
      amount: Joi.required(),
    });
    const { error: error1 } = schema1.validate(req.body);
    if (error1) return res.status(statusCodes.BAD_REQUEST).json({ message: error1.message });

    const schema2 = Joi.object({
      name: Joi.string().min(3).required(),
      amount: Joi.string().min(3).required(),
    });
    const { error: error2 } = schema2.validate(req.body);
    if (error2) return res.status(statusCodes.INCORRECT).json({ message: error2.message });

    const { name, amount } = req.body;
    const product = await this.productService.createProduct(name, amount);
    res.status(statusCodes.CREATED).json(product);
  };
}

export default ProductController;