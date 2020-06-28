import { Theme } from '@react-navigation/native';

export type ResponseMessage<T> = {
  data: T;
  statusCode: number;
  message: string;
};

export type AppTheme = Theme & {
  colors: {
    fontColor: string;
    secondary: string;
    disabledColor: string;
    tabColor: string;
  };
};
