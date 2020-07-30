import { getType } from 'typesafe-actions';
import { notificationActions } from './actions';
import { NotificationActions, NotificationReducer, NotificationRootActions } from './types';

const initState: NotificationReducer = {
  info: undefined,
  message: undefined,
  title: undefined,
};

export const notificationReducer = (state: NotificationReducer = initState, action: NotificationRootActions) => {
  switch (action.type) {
    case getType(notificationActions.setNotification): {
      const { info, message, title } = action.payload;
      return {
        ...state,
        info,
        message,
        title,
      };
    }

    case getType(notificationActions.clearNotification): {
      return initState;
    }

    default: {
      return state;
    }
  }
};
