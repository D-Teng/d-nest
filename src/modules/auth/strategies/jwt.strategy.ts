import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  STRATEGY_JWT_HEADER,
  STRATEGY_JWT,
} from '../constants/strategy.constant';
import { SECRET } from '../constants/secret.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, STRATEGY_JWT) {
  constructor() {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromHeader(STRATEGY_JWT_HEADER),
      ignoreExpiration: false,
      secretOrKey: SECRET,
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, username: payload.username, role: payload.role };
  }
}
