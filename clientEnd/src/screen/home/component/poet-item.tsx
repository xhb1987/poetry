import React, { FC } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { IPoet } from 'src/state/poet/types';
import { useTheme } from '@react-navigation/native';
import { AppTheme } from 'src/common/types/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import MyText from 'src/common/component/text';

type PoetItemProps = {
  isSelected?: boolean;
};

export const PoetItem: FC<Pick<IPoet, 'author' | 'id' | 'title'> & PoetItemProps> = ({ id, title, author }) => {
  const theme = useTheme() as AppTheme;
  const style = getStyle(theme);
  const onPress = () => console.log(id);
  const onLongPress = () => console.log('long', id);
  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={style.container} activeOpacity={0.5}>
      <View style={style.content}>
        <Icon name="bookmark" color={theme.colors.secondary} />
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
      backgroundColor: 'white',
    },

    title: {
      fontWeight: 'bold',
      fontSize: 18,
    },
  });
