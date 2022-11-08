export interface IOrder {
  productsIds: number[];
  username: string;
}

export interface IUser {
  id?: number,
  username: string;
  classe: string;
  level: number;
  password: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface IProduct {
  name: string;
  amount: string;
}