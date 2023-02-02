import * as bcrypt from 'bcryptjs';
import IRes from '../interfaces/IRes';
import usersModel from '../database/models/usersModel';
import tokenUtil from '../utils/token';

const loginUser = async (email: string, password: string): Promise<IRes> => {
  // Procura o usuario por email.
  const user = await usersModel.findOne({ where: { email } });
  if (!user) {
    return { status: 401, message: 'Incorrect email or password' };
  }

  // Verifica se a senha está correta
  const validPassword = await bcrypt.compare(password, user.password);
  if (validPassword === false) {
    return { status: 401, message: 'Incorrect email or password' };
  }

  // Gera o token para o usuário
  const userToken = tokenUtil.generateToken(user.dataValues);
  return { status: 200, message: userToken };
};

const userRole = async (email: string): Promise<IRes> => {
  const userFound = await usersModel.findOne({ where: { email } });
  if (!userFound) {
    return { status: 401, message: 'User not found' };
  }
  return { status: 200, message: userFound.dataValues.role };
};

export default {
  loginUser,
  userRole,
};
