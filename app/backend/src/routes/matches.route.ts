import { Router } from 'express';
import matchesControllers from '../controllers/matches.controllers';

const routers = Router();

routers.get('/', matchesControllers.allMatches);
routers.post('/', matchesControllers.createMatch);

export default routers;
