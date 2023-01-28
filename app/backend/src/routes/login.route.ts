import { Router } from 'express';
import loginValidate from '../middlewares/loginValidate';
import authToken from '../middlewares/authToken'
import userControllers from '../controllers/user.controllers';

const routers = Router();

routers.post('/', loginValidate, userControllers.loginUser);
routers.get('/validate', authToken, userControllers.userRole)

export default routers;