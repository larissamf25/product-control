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

  public async createProduct(name: string, amount: string) {
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?,?)',
      [name, amount],
    );
    return { id: insertId, name, amount };
  }

  public async createProductOrder(id: number, order: number) {
    await this.connection.execute<ResultSetHeader>(
      'UPDATE Trybesmith.Products SET orderId=? WHERE id=?',
      [order, id],
    );
    return true;
  }
}

export default ProductModel;