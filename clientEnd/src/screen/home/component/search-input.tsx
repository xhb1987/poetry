import React, { useState, FC } from 'react';
import { View, TextInput, StyleSheet, Button, Dimensions, Keyboard } from 'react-native';
import { AppTheme } from 'src/common/types/types';
import { useDispatch } from 'react-redux';
import { poetActions } from 'src/state/poet/actions';
import { useTheme, useNavigation } from '@react-navigation/native';
import { MyButton } from 'src/common/component/button';
import { routes } from 'src/screen/routes';

export const SearchInput: FC<{ autoFocus?: boolean }> = ({ autoFocus }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  const navigation = useNavigation();
  const theme = useTheme() as AppTheme;
  const style = getStyle(theme);
  const onInputChange = (text: string) => {
    setInputValue(text);
  };

  const onSearch = () => {
    dispatch(poetActions.searchPoet(inputValue));
    Keyboard.dismiss();
  };

  const onFocus = () => {
    navigation.navigate(routes.searchModal);
    console.log('test');
  };
  return (
    <View style={style.container}>
      <TextInput
        style={style.searchInput}
        onFocus={onFocus}
        onChangeText={onInputChange}
        autoFocus={autoFocus}
        onEndEditing={onSearch}
      />
      <MyButton type="primary" title="搜索" onPress={onSearch} />
    </View>
  );
};

const getStyle = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      width: Dimensions.get('window').width,
      paddingHorizontal: 16,
    },
    searchInput: {
      flex: 5,
      borderColor: theme.colors.primary,
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 4,
      marginRight: 5,
      paddingHorizontal: 10,
      paddingVertical: 2,
    },
    searchButton: {
      fontSize: 16,
    },
  });
