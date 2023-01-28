import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'semsegredo';

const authToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({ message: 'Token not found' });
  }
  const decoded = jwt.verify(authorization, secret);

  req.body.user = decoded;

  next();
};

export default authToken;
