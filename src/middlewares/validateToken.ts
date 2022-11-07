import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

type TypeRequest = {
  username: string,
  iat: number,
  exp: number,
};

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  
  if (!token) res.status(401).json({ message: 'Token not found' });
  
  try {
    const data = jwt.verify(token as string, JWT_SECRET as string) as TypeRequest;
    req.body.username = data.username;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default {
  validateToken,
};