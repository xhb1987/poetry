import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MyText from 'src/common/component/text';
import { GestureResponderEvent, StyleSheet } from 'react-native';
import { AppTheme } from 'src/common/types/types';
import { useTheme } from '@react-navigation/native';
import { Collection } from 'src/state/recites/types';

type CollectionItemProps = {
  isSelected?: boolean;
  collection: Collection;
  onPress?: (e: GestureResponderEvent) => void;
  onLongPress?: (e: GestureResponderEvent) => void;
};
export const CollectionItem: FC<CollectionItemProps> = ({ collection, onPress, onLongPress }) => {
  const theme = useTheme() as AppTheme;
  const style = getStyle(theme);

  return (
    <TouchableOpacity style={style.container} onLongPress={onLongPress} onPress={onPress}>
      <MyText>{collection.name}</MyText>
    </TouchableOpacity>
  );
};

const getStyle = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: 'white',
      alignItems: 'center',
      borderColor: theme.colors.primary,
      borderRadius: 5,
      borderWidth: 1,
      borderStyle: 'solid',
      paddingVertical: 12,
      marginBottom: 12,
    },
  });
