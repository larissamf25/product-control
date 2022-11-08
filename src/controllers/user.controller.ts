import { Request, Response } from 'express';
import Joi from 'joi';
import statusCodes from '../statusCode';
import UserService from '../services/user.service';
import validateUser from './validations/validateUser';

class UserController {
  constructor(private userService = new UserService()) {}

  public login = async (req: Request, res: Response) => {
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(statusCodes.BAD_REQUEST).json({ message: error.message });

    const { username, password } = req.body;
    const token = await this.userService.login({ username, password });
    if (!token) {
      return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Username or password invalid' });
    }

    res.status(statusCodes.OK).json({ token });
  };

  public createUser = async (req: Request, res: Response) => {
    const error = validateUser(req.body);
    if (error) return res.status(error[0]).json({ message: error[1] });

    const { username, classe, level, password } = req.body;
    const token = await this.userService.createUser({ username, classe, level, password });
    res.status(statusCodes.CREATED).json({ token });
  };
}

export default UserController;