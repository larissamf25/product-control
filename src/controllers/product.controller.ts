import { Request, Response } from 'express';
import statusCodes from '../statusCode';
import ProductService from '../services/product.service';

class ProductController {
  constructor(private productService = new ProductService()) {}

  public getAll = async (req: Request, res: Response) => {
    const products = await this.productService.getAll();
    res.status(statusCodes.OK).json(products);
  };

  public createProduct = async (req: Request, res: Response) => {
    const { name, amount } = req.body;
    const product = await this.productService.createProduct(name, amount);
    res.status(statusCodes.CREATED).json(product);
  };
}

export default ProductController;