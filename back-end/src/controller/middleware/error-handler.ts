import {
  ExpressErrorMiddlewareInterface,
  Middleware,
} from "routing-controllers";
import { Response, Request } from "express";
import { Message } from "../../common/response-messge/types";
import generateResponseMessage from "../../common/response-messge/response-message";

@Middleware({ type: "after" })
class ErrorHandler implements ExpressErrorMiddlewareInterface {
  error(
    error: { httpCode: number; name: string; message: string },
    request: Request,
    response: Response,
    next: (err: any) => any
  ) {
    const message = generateResponseMessage(
      error.message,
      error.httpCode,
      Message.Error
    );
    return response.json(message);
  }
}

export default ErrorHandler;
