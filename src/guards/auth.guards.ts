import { AuthGuard as _AuthGuard } from '@nestjs/passport';
import { JwtConstants } from 'src/constants';

export function AuthGuard() {
  const strategies = [JwtConstants.strategyName];
  return _AuthGuard(strategies);
}
