import { Request, Response } from 'express';
import matchesService from '../services/matches.service';
import tokenUtil from '../utils/token';
import IMatch from '../interfaces/IMatch';

const INVALID_TOKEN = 'Invalid Token';
const INVALID_TOKEN_MESSAGE = 'Token must be a valid token';

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

const createMatch = async (req: Request, res: Response) => {
  const match: IMatch = req.body;
  const token = req.headers.authorization;
  const { email } = tokenUtil.tokenVerify(token as string);

  if (email === INVALID_TOKEN) {
    return res.status(401).json({ message: INVALID_TOKEN_MESSAGE });
  }

  if (match.homeTeamId === match.awayTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  const { type, message } = await matchesService.createMatch(match);

  if (type !== 201) {
    return res.status(type).json({ message });
  }

  return res.status(type).json(message);
};

const finishMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const { email } = tokenUtil.tokenVerify(token as string);

  if (email === INVALID_TOKEN) {
    return res.status(401).json({ message: INVALID_TOKEN_MESSAGE });
  }

  const { type, message } = await matchesService.finishMatch(id);

  return res.status(type).json({ message });
};

const updateMatch = async (req: Request, res: Response) => {
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const { id } = req.params;
  const token = req.headers.authorization;
  const { email } = tokenUtil.tokenVerify(token as string);

  if (email === INVALID_TOKEN) {
    return res.status(401).json({ message: INVALID_TOKEN_MESSAGE });
  }

  const { type, message } = await matchesService.updateMatch(id, homeTeamGoals, awayTeamGoals);

  return res.status(type).json({ message });
};

export default {
  allMatches,
  createMatch,
  finishMatch,
  updateMatch,
};
