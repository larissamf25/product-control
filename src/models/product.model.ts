import { Pool, ResultSetHeader } from 'mysql2/promise';

interface IProduct {
  id: number,
  name: string
  amount: string,
  orderId: number,
}

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

  public async getById(productsIds: number[]) {
    const products = await Promise.all(
      productsIds.map(async (id) => {
        const [[row]] = await this.connection.execute<IProduct[] & ResultSetHeader>(
          'SELECT * FROM Trybesmith.Products WHERE id = ?',
          [id],
        );
        return row;
      }),
    );
    return products;
  }

  public async createProduct(name: string, amount: string) {
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?,?)',
      [name, amount],
    );
    return { id: insertId, name, amount };
  }

  public async createProductOrder(name: string, amount: string, order: number) {
    await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount, orderId) VALUES (?,?,?)',
      [name, amount, order],
    );
    return true;
  }
}

export default ProductModel;