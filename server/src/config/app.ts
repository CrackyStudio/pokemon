import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { RootRoutes } from 'routes';
import { AuthRoutes } from 'routes/auth';
import { SecuredRoutes } from 'routes/secured';

class App {
  public app: express.Application;
  public routes: RootRoutes = new RootRoutes();
  public authRoutes: AuthRoutes = new AuthRoutes();
  public securedRoutes: SecuredRoutes = new SecuredRoutes();

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());
    this.routes.routes(this.app);
    this.authRoutes.routes(this.app);
    this.securedRoutes.routes(this.app);
  }
}

export default new App().app;
