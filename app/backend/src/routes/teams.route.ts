import { Router } from 'express';
import teamsControllers from '../controllers/teams.controllers';

const routers = Router();

routers.get('/', teamsControllers.allTeams);
routers.get('/:id', teamsControllers.findTeamById);

export default routers;
