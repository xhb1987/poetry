import { ActionType, StateType } from 'typesafe-actions';
import { notificationActions } from './actions';
import { DropdownAlertType } from 'react-native-dropdownalert';
import { notificationReducer } from './reducer';

export type NotificationReducer = {
  info?: DropdownAlertType;
  message?: string;
  title?: string;
};

export type NotificationActions = ActionType<typeof notificationActions>;

export type NotificationRootActions = NotificationActions;

export type NotificationRootState = StateType<typeof notificationReducer>;
