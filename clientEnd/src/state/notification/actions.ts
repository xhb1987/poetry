import { createAction } from 'typesafe-actions';
import { DropdownAlertType } from 'react-native-dropdownalert';

const SET_NOTIFICATION = 'notification/SET_NOTIFICATION';
const CLEAR_NOTIFICATION = 'notification/CLEAR_NOTIFICATION';

export const notificationActions = {
  setNotification: createAction(SET_NOTIFICATION, (info: DropdownAlertType, message: string, title?: string) => ({
    info,
    message,
    title,
  }))<{
    info: DropdownAlertType;
    message: string;
    title: string | undefined;
  }>(),

  clearNotification: createAction(CLEAR_NOTIFICATION)(),
};
