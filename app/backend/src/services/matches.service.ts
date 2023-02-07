import IMatch from '../interfaces/IMatch';
import matchesModel from '../database/models/matchModel';
import teamModel from '../database/models/teamsModel';

const allMatches = async (filters: { inProgress?: boolean }) => {
  if (filters.inProgress === undefined) {
    const matches = await matchesModel.findAll({
      include: [
        { association: 'homeTeam', attributes: ['teamName'] },
        { association: 'awayTeam', attributes: ['teamName'] }],
    });

    return { status: 200, message: matches };
  }

  const matches = await matchesModel.findAll({
    where: filters,
    include: [
      { association: 'homeTeam', attributes: ['teamName'] },
      { association: 'awayTeam', attributes: ['teamName'] }],
  });

  return { status: 200, message: matches };
};

const createMatch = async (match: IMatch) => {
  const homeTeam = await teamModel.findByPk(match.homeTeamId);
  const awayTeam = await teamModel.findByPk(match.awayTeamId);

  if (!homeTeam || !awayTeam) {
    return { type: 404, response: 'There is no team with such id!' };
  }

  const newMatch = await matchesModel.create({ ...match, inProgress: true });

  if (!newMatch) {
    return { type: 500, response: 'Something went wrong' };
  }

  return { type: 201, response: newMatch };
};

export default {
  allMatches,
  createMatch,
};
