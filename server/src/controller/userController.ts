import { Request, Response } from 'express';
import { UpdateOptions, DestroyOptions } from 'sequelize';

import { User, UserInterface } from 'models/userModel';

export class UserController {
  public index(_req: Request, res: Response): void {
    User.findAll<User>({})
      .then((users: Array<User>) => res.json(users))
      .catch((err: Error) => res.status(500).json(err));
  }

  public show(req: Request, res: Response) {
    const key: string = req.params.key;
    const value: number | string = req.params.value || parseInt(req.params.value);

    User.findOne<User>({
      where: { [key]: value },
    })
      .then((user: User | null) => {
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      })
      .catch((err: Error) => res.status(500).json(err));
  }

  public update(req: Request, res: Response): void {
    const userId: number = parseInt(req.params.id);
    const params: UserInterface = req.body;

    const update: UpdateOptions = {
      where: { id: userId },
      limit: 1,
    };

    User.update(params, update)
      .then(() => res.status(202).json({ success: 'User updated' }))
      .catch((err: Error) => res.status(500).json(err));
  }

  public delete(req: Request, res: Response): void {
    const userId: number = parseInt(req.params.id);
    const options: DestroyOptions = {
      where: { id: userId },
      limit: 1,
    };

    User.destroy(options)
      .then(() => res.status(204).json({ success: 'User destroyed' }))
      .catch((err: Error) => res.status(500).json(err));
  }
}
