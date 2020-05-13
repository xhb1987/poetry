import { Message, ResponseMessage } from "./types";

const generateResponseMessage = <T>(
  data: T,
  statusCode: number = 200,
  message: Message = Message.Success
): ResponseMessage<T> => ({
  statusCode,
  message,
  data,
});

export default generateResponseMessage;
