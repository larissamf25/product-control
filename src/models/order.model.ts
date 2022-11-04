import { Pool, ResultSetHeader } from 'mysql2/promise';

class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll() {
    const result = await this.connection.execute<ResultSetHeader>(
      'SELECT o.id, o.userId, JSON_ARRAYAGG(p.id) AS productsIds '
      + 'FROM Trybesmith.Orders AS o INNER JOIN Trybesmith.Products AS p GROUP BY o.id',
    );
    const [rows] = result;
    return rows;
  }
}

export default OrderModel;