import { Pool, ResultSetHeader } from 'mysql2/promise';

class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  /* public async getAll() {
    const [rows] = await this.connection.execute<ResultSetHeader>(
      'SELECT * FROM Trybesmith.Products',
    );
    return rows;
  } */ 

  public async createUser(username: string, classe: string, level: number, password: string) {
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?,?,?,?)',
      [username, classe, level, password],
    );
    return { id: insertId, username, classe, level, password };
  }
}

export default UserModel;