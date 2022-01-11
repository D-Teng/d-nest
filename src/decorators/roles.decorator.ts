import { SetMetadata } from '@nestjs/common';
import { RoleType } from 'src/constants';
import { ROLES } from 'src/constants/metaData';

export const Roles = (...roles: RoleType[]) => SetMetadata(ROLES, roles);
