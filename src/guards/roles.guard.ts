import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES } from 'src/modules/auth/constants/metadata.constant';
import { ROLE_TYPE } from 'src/modules/auth/constants/role-type.constant';

function matchRoles(
  user: any,
  requiredRoles: ROLE_TYPE[],
): boolean | Promise<boolean> | Observable<boolean> {
  return requiredRoles.some((role) => user?.role === role);
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<ROLE_TYPE[]>(ROLES, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return matchRoles(user, requiredRoles);
  }
}
