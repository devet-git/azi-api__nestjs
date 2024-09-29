import { SetMetadata } from '@nestjs/common';
/**
 * Allow listed roles to access resources
 * @param roles
 * @returns
 */
export const AllowRoles = (...roles: string[]) => SetMetadata('roles', roles);
