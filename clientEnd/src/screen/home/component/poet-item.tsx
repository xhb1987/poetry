import React, { FC } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, GestureResponderEvent } from 'react-native';
import { Poet } from 'src/state/poet/types';
import { useTheme } from '@react-navigation/native';
import { AppTheme } from 'src/common/types/types';
import MyText from 'src/common/component/text';

type PoetItemProps = {
  isSelected?: boolean;
  poet: Poet;
  onPress?: (e: GestureResponderEvent) => void;
  onLongPress?: (e: GestureResponderEvent) => void;
};

export const PoetItem: FC<PoetItemProps> = ({ poet, onPress, onLongPress }) => {
  const { id, title, author } = poet;

  const theme = useTheme() as AppTheme;
  const style = getStyle(theme);

  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={style.container} activeOpacity={0.5}>
      <View style={style.content}>
        <MyText style={style.title}>{title}</MyText>
        <MyText>{author}</MyText>
      </View>
    </TouchableOpacity>
  );
};

const getStyle = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      width: Dimensions.get('window').width,
    },
    content: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderColor: theme.colors.primary,
      borderRadius: 5,
      borderStyle: 'solid',
      flexDirection: 'row',
      borderWidth: 1,
      padding: 16,
      margin: 16,
      marginBottom: 0,
      backgroundColor: 'white',
    },

    title: {
      fontWeight: 'bold',
      fontSize: 18,
    },
  });
