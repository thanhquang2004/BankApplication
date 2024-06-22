import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Customer } from '@prisma/client';

const getCurrentUserByContext = (context: ExecutionContext): Customer => {
  const request = context.switchToHttp().getRequest();
  console.log(request.user);
  return request.user;
};

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
