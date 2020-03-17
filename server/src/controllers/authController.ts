import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';

import { User } from 'models/userModel';

export class AuthController {
  public async register(req: Request, res: Response): Promise<void> {
    const { nickname, password, role } = req.body;

    try {
      const user = new User({
        nickname,
        password,
        role: role === undefined ? 'user' : 'admin',
      });

      user.hashPassword();

      await user.save();

      res.status(201).json({
        user: user.nickname,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    const { JWT_SECRET } = process.env;
    const { nickname, password } = req.body;

    if (!(nickname && password && JWT_SECRET)) {
      res.status(400).json({ error: 'Inputs are not filled' });
      return;
    }

    let user: User | null;

    try {
      user = await User.findOne({ where: { nickname } });
    } catch (error) {
      res.status(401).json({ error: 'User does not exists' });
      return;
    }

    if (!user) {
      res.status(500).json({ error: 'User is null' });
    } else {
      if (!user.checkIfUnencryptedPasswordIsValid(password)) {
        res.status(401).json({ error: 'Invalid password' });
        return;
      }

      const token = sign(
        {
          id: user.id,
          nickname: user.nickname,
        },
        JWT_SECRET,
      );

      res.send(token);
    }
  }
}
