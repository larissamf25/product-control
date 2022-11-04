import express from 'express';
import ProductController from './controllers/product.controller';

const app = express();
const productController = new ProductController();

app.use(express.json());

app.post('/products', productController.createProduct);
app.get('/products', productController.getAll); 

/* app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const { name, message, details } = err as any;
  console.log(`name: ${name}`);

  switch (name) {
    case 'ValidationError':
      res.status(400).json({ message: details[0].message });
      break;
    case 'NotFoundError':
      res.status(404).json({ message });
      break;
    case 'ConflictError':
      res.status(409).json({ message });
      break;
    default:
      console.error(err);
      res.sendStatus(500);
  }

  next();
}); */

export default app;