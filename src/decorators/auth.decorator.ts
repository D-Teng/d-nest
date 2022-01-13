import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ROLES } from 'src/modules/auth/constants/metadata.constant';
import { AuthGuard } from 'src/guards/auth.guards';
import { RolesGuard } from 'src/guards/roles.guard';
import { ROLE_TYPE } from 'src/modules/auth/constants/role-type.constant';

export function Auth(roles: ROLE_TYPE[] = []) {
  return applyDecorators(
    SetMetadata(ROLES, roles),
    UseGuards(AuthGuard(), RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
