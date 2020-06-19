import { Theme } from '@react-navigation/native';

export interface ResponseMessage<T> {
  data: T;
  statusCode: number;
  message: string;
}

export type AppTheme = Theme & {
  colors: {
    fontColor: string;
    secondary: string;
  };
};
