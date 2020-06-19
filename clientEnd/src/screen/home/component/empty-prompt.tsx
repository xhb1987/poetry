import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import MyText from 'src/common/component/text';
import { SearchButton } from './search-button';

export const EmptyPrompt = () => {
  const theme = useTheme();
  const style = getStyle(theme.colors.primary);

  return (
    <View style={style.container}>
      <View style={style.content}>
        <MyText>还没有添加古诗，快去搜索看看吧!</MyText>
        <View style={style.iconButton}>
          <SearchButton iconSize={24} />
        </View>
      </View>
    </View>
  );
};

const getStyle = (color: string) =>
  StyleSheet.create({
    container: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height * 0.9,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      borderColor: color,
      borderRadius: 10,
      borderWidth: 2,
      borderStyle: 'solid',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10%',
      lineHeight: 15,
    },
    iconButton: {
      marginTop: 16,
    },
  });
