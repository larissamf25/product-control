import { Request, Response } from 'express';
import Joi from 'joi';
import statusCodes from '../statusCode';
import UserService from '../services/user.service';

class UserController {
  constructor(private userService = new UserService()) {}

  /* ublic getAll = async (req: Request, res: Response) => {
    const products = await thisuserService.getAll();
    res.status(statusCodes.OK).json(products);
  }; */

  public login = async (req: Request, res: Response) => {
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(statusCodes.BAD_REQUEST).json({ message: error.message });

    const { username, password } = req.body;
    const token = await this.userService.login(username, password);
    if (!token) {
      return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Username or password invalid' });
    }

    res.status(statusCodes.OK).json({ token });
  };

  public createUser = async (req: Request, res: Response) => {
    const { username, classe, level, password } = req.body;
    const token = await this.userService.createUser(username, classe, level, password);
    res.status(statusCodes.CREATED).json({ token });
  };
}

export default UserController;