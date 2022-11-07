import express from 'express';
import ProductController from './controllers/product.controller';
import UserController from './controllers/user.controller';
import OrderController from './controllers/order.controller';
import validateToken from './middlewares/validateToken';

const app = express();
const productController = new ProductController();
const userController = new UserController();
const orderController = new OrderController();

app.use(express.json());

app.post('/products', productController.createProduct);
app.get('/products', productController.getAll); 
app.post('/users', userController.createUser);
app.get('/orders', orderController.getAll);
app.post('/login', userController.login);
app.post('/orders', validateToken, orderController.createOrder);

export default app;