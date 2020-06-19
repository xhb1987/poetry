import React, { FC } from 'react';
import { View, Button, TouchableOpacity } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { AppTheme } from 'src/common/types/types';
import MyText from 'src/common/component/text';

type DrawerItemProps = {
  route: string;
  title: string;
  navigation: DrawerNavigationHelpers;
  onClick?: Function;
};

export const DrawerItem: FC<DrawerItemProps> = ({ route, title, onClick, navigation }) => {
  const onPress = () => {
    onClick && onClick();
    navigation.navigate(route);
  };

  const theme = useTheme() as AppTheme;

  return (
    <TouchableOpacity onPress={onPress} style={{ marginVertical: 8 }}>
      <MyText style={{ fontSize: 16 }}>{title}</MyText>
    </TouchableOpacity>
  );
};
