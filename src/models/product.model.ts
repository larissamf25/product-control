import { Pool, ResultSetHeader } from 'mysql2/promise';

class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll() {
    const [rows] = await this.connection.execute<ResultSetHeader>(
      'SELECT * FROM Trybesmith.Products',
    );
    return rows;
  }

  public async createProduct(name: string, amount: number) {
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?,?)',
      [name, amount],
    );
    return { id: insertId, name, amount };
  }
}

export default ProductModel;