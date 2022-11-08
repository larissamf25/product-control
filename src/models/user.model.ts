import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { IUser } from '../interfaces';

class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getById(username: string): Promise<IUser> {
    const [[rows]] = await this.connection.execute<IUser[] & RowDataPacket[]>(
      'SELECT * FROM Trybesmith.Users WHERE username = ?',
      [username],
    );
    return rows;
  }

  public async createUser(user: IUser) {
    const { username, classe, level, password } = user;
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?,?,?,?)',
      [username, classe, level, password],
    );
    return { id: insertId, username, classe, level, password };
  }
}

export default UserModel;