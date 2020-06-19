import React, { FC } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme, useNavigation } from '@react-navigation/native';
import { routes } from '../../routes';

export const SearchButton: FC<{ iconSize?: number }> = ({ iconSize = 20 }) => {
  const theme = useTheme();
  const navigator = useNavigation();
  const onPress = () => {
    navigator.navigate(routes.search);
  };
  return (
    <View style={{ paddingRight: 10 }}>
      <Icon name="search" size={iconSize} color={theme.colors.primary} onPress={onPress} />
    </View>
  );
};
