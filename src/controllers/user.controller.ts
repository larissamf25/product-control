import { Request, Response } from 'express';
import statusCodes from '../statusCode';
import UserService from '../services/user.service';

class UserController {
  constructor(private userService = new UserService()) {}

  /* ublic getAll = async (req: Request, res: Response) => {
    const products = await thisuserService.getAll();
    res.status(statusCodes.OK).json(products);
  }; */

  /* public login = async (username: string) => {
    const token = await this.userService.login(username);
    return token;
  }; */

  public createUser = async (req: Request, res: Response) => {
    const { username, classe, level, password } = req.body;
    const token = await this.userService.createUser(username, classe, level, password);
    res.status(statusCodes.CREATED).json({ token });
  };
}

export default UserController;