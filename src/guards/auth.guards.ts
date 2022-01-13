import { AuthGuard as _AuthGuard } from '@nestjs/passport';
import { STRATEGY_JWT } from 'src/modules/auth/constants/strategy.constant';

export function AuthGuard() {
  const strategies = [STRATEGY_JWT];
  return _AuthGuard(strategies);
}
