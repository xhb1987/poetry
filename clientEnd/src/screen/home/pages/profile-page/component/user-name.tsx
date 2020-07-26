import React, { FC } from 'react';
import MyText from 'src/common/component/text';
import { useSelector } from 'react-redux';
import { selectUserState } from 'src/state/user/selector';
import { selectAuthState } from 'src/state/auth/selectors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';
import { View } from 'react-native';

export const UserName: FC = () => {
  const user = useSelector(selectUserState);
  const auth = useSelector(selectAuthState);
  const { username } = user;
  const { isAuthenticated } = auth;
  const theme = useTheme();

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 8 }}>
      <Icon name="user-circle" color={theme.colors.primary} size={18} />
      <MyText style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginLeft: 2 }}> {username}</MyText>
    </View>
  );
};
