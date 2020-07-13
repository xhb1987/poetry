import React, { FC } from 'react';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { View, TouchableHighlight, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { routes } from 'src/screen/routes';
import MyText from 'src/common/component/text';

Icon.loadFont();

export const RegisterButton: FC = () => {
  const theme = useTheme();
  const navigator = useNavigation();

  const onPress = () => {
    navigator.navigate(routes.register);
  };
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={{ paddingRight: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
    >
      <Icon name="user-plus" size={20} color={theme.colors.primary} />
      <MyText style={{ color: theme.colors.primary, marginLeft: 6 }}>注册</MyText>
    </TouchableOpacity>
  );
};
