import { RootController } from 'controllers/rootController';

export class RootRoutes {
  public rootController: RootController = new RootController();

  routes(app: any): void {
    // Root routes
    app.route('/').get(this.rootController.index);
  }
}
