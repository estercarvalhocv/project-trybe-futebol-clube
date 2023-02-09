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
    return { type: 404, message: 'There is no team with such id!' };
  }

  const newMatch = await matchesModel.create({ ...match, inProgress: true });

  if (!newMatch) {
    return { type: 500, message: 'Something went wrong' };
  }

  return { type: 201, message: newMatch };
};

const finishMatch = async (id: string) => {
  await matchesModel.update({ inProgress: false }, { where: { id } });
  return { type: 200, message: 'Finished' };
};

const updateMatch = async (id: string, homeTeamGoals: string, awayTeamGoals: string) => {
  await matchesModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  return { type: 200, message: 'Updated' };
};

export default {
  allMatches,
  createMatch,
  finishMatch,
  updateMatch,
};
