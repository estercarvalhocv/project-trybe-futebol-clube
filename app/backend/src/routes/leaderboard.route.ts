import * as express from 'express';
import leaderboardController from '../controllers/leaderboard.controllers';

const leaderboardRouter = express.Router();

leaderboardRouter.get('/', leaderboardController.findAll);
leaderboardRouter.get('/home', leaderboardController.createResultHome);

export default leaderboardRouter;