import { Request, Response } from 'express';
import statusCodes from '../statusCode';
import ProductService from '../services/product.service';
import validateProduct from './validations/validateProduct';

class ProductController {
  constructor(private productService = new ProductService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const products = await this.productService.getAll();
    res.status(statusCodes.OK).json(products);
  };

  public createProduct = async (req: Request, res: Response) => {
    const error = validateProduct(req.body);
    if (error) return res.status(error[0]).json({ message: error[1] });

    const { name, amount } = req.body;
    const product = await this.productService.createProduct({ name, amount });
    res.status(statusCodes.CREATED).json(product);
  };
}

export default ProductController;