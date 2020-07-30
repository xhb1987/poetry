import React, { FC, useEffect, useRef } from 'react';
import { View } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import { useDispatch, useSelector } from 'react-redux';
import MyText from 'src/common/component/text';
import { AppTheme } from 'src/common/types/types';
import { notificationActions } from 'src/state/notification/actions';
import {
  selectNotificationInfo,
  selectNotificationMessage,
  selectNotificationTitle,
} from 'src/state/notification/selectors';

export const Notification: FC<{ theme: AppTheme }> = ({ theme }) => {
  const notificationRef = useRef<DropdownAlert>(null);
  const dispatch = useDispatch();
  const info = useSelector(selectNotificationInfo);
  const title = useSelector(selectNotificationTitle);
  const message = useSelector(selectNotificationMessage);

  const borderColor = info === 'info' ? theme.colors.primary : theme.colors.secondary;
  useEffect(() => {
    if (notificationRef) {
      if (!!info && !!message) {
        notificationRef.current?.alertWithType(info, title || '', message);
      }
    }
  }, [notificationRef, info, message, title]);

  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 1000000,
        width: '100%',
        marginTop: 32,
        opacity: 0.9,
      }}
    >
      <DropdownAlert
        infoColor={theme.colors.primary}
        errorColor={theme.colors.secondary}
        wrapperStyle={{
          marginHorizontal: 6,
          marginVertical: 6,
          borderRadius: 6,
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: borderColor,
        }}
        containerStyle={{ borderRadius: 4, color: 'black' }}
        contentContainerStyle={{
          flex: 1,
          flexDirection: 'row',
          opacity: 0.8,
        }}
        closeInterval={800}
        ref={notificationRef}
        onClose={() => dispatch(notificationActions.clearNotification())}
      />
    </View>
  );
};
