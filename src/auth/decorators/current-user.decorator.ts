import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator((context: ExecutionContext) => {
  const request = context?.switchToHttp()?.getRequest();
  return request && request.user;
});
