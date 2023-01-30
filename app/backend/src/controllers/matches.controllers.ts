import { Request, Response } from 'express';
import matchesService from '../services/matches.service';

const allMatches = async (req: Request, res: Response) => {
  const { inProgress } = req.query;

  const { status, message } = await matchesService.allMatches({
    inProgress: inProgress === undefined ? undefined : inProgress === 'true',
  });

  if (status === 200) {
    res.status(status).json(message);
  } else {
    res.status(400).json('Could not found the matches.');
  }
};

export default {
  allMatches,
};
