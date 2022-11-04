import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';

interface ILogin {
  email: string,
  password: string,
}

class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getById(username: string, password: string): Promise<ILogin> {
    const [[rows]] = await this.connection.execute<ILogin[] & RowDataPacket[]>(
      'SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?',
      [username, password],
    );
    return rows;
  }

  public async createUser(username: string, classe: string, level: number, password: string) {
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?,?,?,?)',
      [username, classe, level, password],
    );
    return { id: insertId, username, classe, level, password };
  }
}

export default UserModel;