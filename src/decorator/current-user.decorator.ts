import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CurrentUserDto } from '../modules/auth/dto/current-user.dto';

export const CurrentUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as CurrentUserDto;
});
