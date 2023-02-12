import { Request, Response } from 'express';
import leaderboardService from '../services/leaderboard.service';

const findAll = async (req: Request, res: Response) => {
  const message = await leaderboardService.sumBoard();
  return res.status(200).json(message);
};

const createResultHome = async (_req: Request, res: Response) => {
  const message = await leaderboardService.createResultsHome();
  message.sort((a, b) => b.totalPoints - a.totalPoints
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
  return res.status(200).json(message);
};

export default {
  findAll,
  createResultHome,
};
