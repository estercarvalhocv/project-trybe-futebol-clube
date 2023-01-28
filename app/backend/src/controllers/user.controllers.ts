import { Request, Response } from 'express';
import userService from '../services/user.service';

const loginUser = async (req: Request, res: Response):Promise<void> => {
  const { email, password } = req.body;
  const { status, message } = await userService.loginUser(email, password);
  
  if (status === 200) {
    res.status(status).json({ token: message });
  } else {
    res.status(status).json({ message });
  }
};

const userRole = async (req: Request, res: Response) => {
  const { role } = req.body.user;
  res.status(200).json({ role });
};

export default {
  loginUser,
  userRole,
};