import teamModel from '../database/models/teamsModel';
import matchesModel from '../database/models/matchModel';
import ILeaderboard from '../interfaces/ILeaderboard';
import IMatch from '../interfaces/IMatch';

const createBoard = async (): Promise<ILeaderboard[]> => {
  const teams = await teamModel.findAll();

  const board: ILeaderboard[] = teams.map((value) => ({
    id: value.id,
    name: value.teamName,
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0,
  }));
  return board;
};

const calculate = (team: ILeaderboard): number => {
  const games = team.totalDraws + team.totalLosses + team.totalVictories;
  const efficiency = (((team.totalPoints / (games * 3))) * 100).toFixed(2);
  return parseFloat(efficiency);
};

const createResultsHome = async (): Promise<ILeaderboard[]> => {
  const board = await createBoard();
  const matchs: IMatch[] = await matchesModel.findAll({ where: { inProgress: false } });
  matchs.forEach((data) => {
    const team = board.find((e) => data.homeTeamId === e.id) as ILeaderboard;
    if (data.homeTeamGoals > data.awayTeamGoals) {
      team.totalPoints += 3;
      team.totalVictories += 1;
    } else if (data.homeTeamGoals < data.awayTeamGoals) {
      team.totalLosses += 1;
    } else { team.totalPoints += 1; team.totalDraws += 1; }
    team.totalGames += 1;
    team.goalsFavor += data.homeTeamGoals;
    team.goalsOwn += data.awayTeamGoals;
    team.goalsBalance = team.goalsFavor - team.goalsOwn;
    team.efficiency = calculate(team as ILeaderboard);
  });
  return board;
};

const createResultsAway = async (): Promise<ILeaderboard[]> => {
  const board = await createBoard();
  const matchs: IMatch[] = await matchesModel.findAll({ where: { inProgress: false } });
  matchs.forEach((data) => {
    const team = board.find((e) => data.awayTeamId === e.id) as ILeaderboard;
    if (data.awayTeamGoals > data.homeTeamGoals) {
      team.totalPoints += 3;
      team.totalVictories += 1;
    } else if (data.awayTeamGoals < data.homeTeamGoals) {
      team.totalLosses += 1;
    } else { team.totalPoints += 1; team.totalDraws += 1; }
    team.totalGames += 1;
    team.goalsFavor += data.awayTeamGoals;
    team.goalsOwn += data.homeTeamGoals;
    team.goalsBalance = team.goalsFavor - team.goalsOwn;
    team.efficiency = calculate(team as ILeaderboard);
  });
  return board;
};

const createResultBoard = async (): Promise<ILeaderboard[]> => {
  const home = await createResultsHome();
  const away = await createResultsAway();
  const board = home.map((data) => {
    const team = away.find((e) => data.name === e.name) as ILeaderboard;
    team.totalPoints += data.totalPoints;
    team.totalDraws += data.totalDraws;
    team.totalVictories += data.totalVictories;
    team.totalLosses += data.totalLosses;
    team.totalGames += data.totalGames;
    team.goalsFavor += data.goalsFavor;
    team.goalsOwn += data.goalsOwn;
    team.goalsBalance += data.goalsBalance;
    team.efficiency = calculate(team);
    return team;
  });
  board.sort((a, b) => b.totalPoints - a.totalPoints || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor || b.goalsOwn - a.goalsOwn);
  return board;
};

export default {
  createResultsHome,
  createResultsAway,
  createResultBoard,
};
