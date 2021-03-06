import { UserController } from 'controllers/userController';
import { checkJwt } from 'middlewares/checkJwt';
import { isAdmin } from 'middlewares/isAdmin';

export class SecuredRoutes {
  public userController: UserController = new UserController();

  routes(app: any): void {
    const { userController } = this;

    // User routes
    app.route('/users').get([checkJwt], userController.index);
    app.route('/users/:key/:value').get([checkJwt, isAdmin], userController.show);
    app
      .route('/users/:id')
      .put([checkJwt, isAdmin], userController.update)
      .delete([checkJwt, isAdmin], userController.delete);
  }
}
