export enum Message {
  Success = "success",
  Error = "error",
  Info = "info",
  Unknown = "unknown",
}

export interface ResponseMessage<T> {
  statusCode: number;
  message: Message;
  data: T;
}
