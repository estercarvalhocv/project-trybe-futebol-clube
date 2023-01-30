import matchesModel from '../database/models/matchModel';

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

export default {
  allMatches,
};
