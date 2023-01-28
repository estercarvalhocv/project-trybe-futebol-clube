import * as jwt from 'jsonwebtoken';
import IUser from '../interfaces/IUser';

const secret = process.env.JWT_SECRET || 'semsegredo';

const generateToken = (data: IUser) => {
  const token = jwt.sign(data, secret, { algorithm: 'HS256', expiresIn: '360min' });
  return token;
};

export default generateToken;