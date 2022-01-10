import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator<string>(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log('User Decorator', data);
    return request.user;
  },
);
