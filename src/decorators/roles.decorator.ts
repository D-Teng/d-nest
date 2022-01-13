import { SetMetadata } from '@nestjs/common';
import { ROLES } from 'src/modules/auth/constants/metadata.constant';
import { ROLE_TYPE } from 'src/modules/auth/constants/role-type.constant';

export const Roles = (...roles: ROLE_TYPE[]) => SetMetadata(ROLES, roles);
