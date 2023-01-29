import teamsModel from '../database/models/teamsModel';

const allTeams = async () => {
  const teams = await teamsModel.findAll();
  return { status: 200, message: teams };
};

const findTeamById = async (id: string) => {
  const [team] = await teamsModel.findAll({ where: { id } });
  return { status: 200, message: team };
};

export default {
  allTeams,
  findTeamById,
};
