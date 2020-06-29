import React, { FC } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { recitesActions } from 'src/state/recites/actions';
Icon.loadFont();

export const AddButton: FC = () => {
  const dispatch = useDispatch();
  const openAddCollection = () => {
    dispatch(recitesActions.openAddCollectionDialog());
  };
  const theme = useTheme();
  return (
    <View style={{ paddingRight: 10 }}>
      <Icon size={24} name="folder-plus-outline" color={theme.colors.primary} onPress={openAddCollection} />
    </View>
  );
};
