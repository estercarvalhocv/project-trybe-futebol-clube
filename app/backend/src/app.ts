import * as express from 'express';
import loginRoute from './routes/login.route';
import matchesRoute from './routes/matches.route';
import teamsRoute from './routes/teams.route';
import leaderboardRouter from './routes/leaderboard.route';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use('/login', loginRoute);
    this.app.use('/login/validate', loginRoute);
    this.app.use('/teams', teamsRoute);
    this.app.use('/teams/:id', teamsRoute);
    this.app.use('/matches', matchesRoute);
    this.app.use('/matches/:id/finish', matchesRoute);
    this.app.use('/matches/:id', matchesRoute);
    this.app.use('/leaderboard', leaderboardRouter);
    this.app.use('/leaderboard/home', leaderboardRouter);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
