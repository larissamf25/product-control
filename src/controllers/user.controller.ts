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

  public validateUser = (body: object) => {
    const schema1 = Joi.object({
      username: Joi.required(),
      classe: Joi.required(),
      level: Joi.required(),
      password: Joi.required(),
    });
    const { error: error1 } = schema1.validate(body);
    if (error1) return ['1', error1.message];
    const schema2 = Joi.object({
      username: Joi.string().min(3).required(),
      classe: Joi.string().min(3).required(),
      level: Joi.number().min(1),
      password: Joi.string().min(8),
    });
    const { error: error2 } = schema2.validate(body);
    if (error2) return ['2', error2.message];
    return ['0', 'ok'];
  };

  public createUser = async (req: Request, res: Response) => {
    const [type, message] = this.validateUser(req.body);
    if (type === '1') {
      return res.status(statusCodes.BAD_REQUEST).json({ message });
    }
    if (type === '2') {
      return res.status(statusCodes.INCORRECT).json({ message });
    }

    const { username, classe, level, password } = req.body;
    const token = await this.userService.createUser(username, classe, level, password);
    res.status(statusCodes.CREATED).json({ token });
  };
}

export default UserController;