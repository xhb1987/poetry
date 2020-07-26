import React, { FC } from 'react';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { View, TouchableHighlight, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { routes } from 'src/screen/routes';
import MyText from 'src/common/component/text';
import { authActions } from 'src/state/auth/actions';
import { selectAuthState } from 'src/state/auth/selectors';

Icon.loadFont();

export const LogoutButton: FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigator = useNavigation();
  const auth = useSelector(selectAuthState);

  const { isAuthenticated } = auth;
  const onPress = () => {
    dispatch(authActions.clearError());
    dispatch(authActions.userLogout());
    navigator.navigate('首页');
  };

  if (!isAuthenticated) {
    return <></>;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={{ paddingRight: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
    >
      <Icon name="log-out" size={20} color={theme.colors.primary} />
      <MyText style={{ color: theme.colors.primary, marginLeft: 6 }}>退出</MyText>
    </TouchableOpacity>
  );
};
