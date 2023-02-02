import * as jwt from 'jsonwebtoken';
import IUser from '../interfaces/IUser';
import IToken from '../interfaces/IToken';

const secret = process.env.JWT_SECRET || 'semsegredo';

const generateToken = (data: IUser) => {
  const token = jwt.sign(data, secret, {
    algorithm: 'HS256',
    expiresIn: '360min',
  });
  return token;
};

const tokenVerify = (token: string): IToken => {
  try {
    const userDecoded = jwt.verify(token, secret);
    return userDecoded as IToken;
  } catch (error) {
    console.log(error);
    return { email: 'Invalid Token' };
  }
};

export default {
  generateToken,
  tokenVerify,
};
