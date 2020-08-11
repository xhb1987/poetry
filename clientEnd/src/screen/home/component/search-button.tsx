import React, { FC } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme, useNavigation } from '@react-navigation/native';
import { routes } from '../../routes';
import { useDispatch } from 'react-redux';
import { poetryActions } from 'src/state/poetry/actions';

export const SearchButton: FC<{ iconSize?: number }> = ({ iconSize = 20 }) => {
  const theme = useTheme();
  const navigator = useNavigation();

  const dispatch = useDispatch();

  const onPress = () => {
    dispatch(poetryActions.clearSearchResult());
    navigator.navigate(routes.searchModal);
  };
  return (
    <View style={{ paddingRight: 10 }}>
      <Icon name="search" size={iconSize} color={theme.colors.primary} onPress={onPress} />
    </View>
  );
};
