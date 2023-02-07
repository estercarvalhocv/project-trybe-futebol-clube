import { Request, Response } from 'express';
import teamsService from '../services/teams.service';

const allTeams = async (_req: Request, res: Response) => {
  const { status, message } = await teamsService.allTeams();

  if (status === 200) {
    res.status(status).json(message);
  } else {
    res.status(400).json('Couldn\'t found the teams.');
  }
};

const findTeamById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, message } = await teamsService.findTeamById(id);

  if (status === 200) {
    res.status(status).json(message);
  } else {
    res.status(400).json('Could not find the team.');
  }
};

export default {
  allTeams,
  findTeamById,
};
