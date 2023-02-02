import { Router } from 'express';
import loginValidate from '../middlewares/loginValidate';
import userControllers from '../controllers/user.controllers';
import authToken from '../middlewares/authToken';

const routers = Router();

routers.post('/', loginValidate, userControllers.loginUser);
routers.get('/validate', authToken, userControllers.userRole);

export default routers;
