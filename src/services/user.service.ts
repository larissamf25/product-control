import jwt from 'jsonwebtoken';
import connection from '../models/connection';
import UserModel from '../models/user.model';

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async login(username: string, password: string) {
    const theUserExists = await this.model.getById(username, password);
    if (!theUserExists) return null;

    const token = jwt.sign({ data: { username, password } }, process.env.JWT_SECRET as string, {
      expiresIn: '1d', algorithm: 'HS256',
    });
    return token;
  }

  public async createUser(username: string, classe: string, level: number, password: string) {
    await this.model.createUser(username, classe, level, password);
    const token = this.login(username, password);
    return token;
  }
}

export default UserService;