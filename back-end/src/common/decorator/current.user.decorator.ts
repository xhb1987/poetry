import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    console.log("data => ", data);
    const req = context.switchToHttp().getRequest();
    return req.user;
  }
);
