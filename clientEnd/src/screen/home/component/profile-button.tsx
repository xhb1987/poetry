import React, { FC } from 'react';
import { Button } from 'react-native-elements';
import { DrawerActions, useNavigation, useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View } from 'react-native';
Icon.loadFont();

export const ProfileButton = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const onPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  return (
    <View style={{ paddingLeft: 10 }}>
      <Icon name="bars" color={theme.colors.primary} size={24} onPress={onPress} />
    </View>
  );
};
