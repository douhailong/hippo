import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

type Payload = Partial<User>;
type ExpiresIn = string | number;

class JwtHelper {
  constructor(readonly secret: string = 'hippo_secret') {}

  generateAccessToken(payload: Payload, expiresIn: ExpiresIn) {
    return jwt.sign(payload, this.secret, {
      expiresIn
    });
  }

  generateRefreshToken(payload: Payload, expiresIn: ExpiresIn) {
    return jwt.sign(payload, this.secret, {
      expiresIn
    });
  }

  verifyToken(token: string) {
    return jwt.verify(token, this.secret) as Payload;
  }
}

export const jwtHelper = new JwtHelper();
