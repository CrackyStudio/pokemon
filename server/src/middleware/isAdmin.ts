import { Request, Response, NextFunction } from 'express';
import { User } from '../models/userModel';

export const isAdmin = async (_req: Request, res: Response, next: NextFunction) => {
  const id = res.locals.jwtPayload.id;

  let user: User | null;
  try {
    user = await User.findOne({
      where: {
        id,
      },
    });

    if (user && user.role === 'admin') next();
    else res.status(401).send();
  } catch (id) {
    res.status(401).send();
  }
};
