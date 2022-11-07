import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

type TypeRequest = {
  username: string,
};

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  
  if (!token) return res.status(401).json({ message: 'Token not found' });
  
  try {
    const data = jwt.verify(token, JWT_SECRET as string) as TypeRequest;
    req.body.username = data.username;
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  next();
};

export default validateToken;