import React from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import MyText from 'src/common/component/text';
import { useSelector, useDispatch } from 'react-redux';
import { selectPoetSearchLoading, selectPoetSearch } from 'src/state/poet/selector';
import { PoetItem } from '../component/poet-item';
import { useTheme } from '@react-navigation/native';
import { LoadingIndicator } from '../component/loading-indicator';
import { poetActions } from 'src/state/poet/actions';
import { Poet } from 'src/state/poet/types';

export const SearchPage = () => {
  const dispatch = useDispatch();
  const searchLoading = useSelector(selectPoetSearchLoading);
  const searchPoet = useSelector(selectPoetSearch);
  const theme = useTheme();

  const onPoetItemPress = (poet: Poet) => {
    dispatch(poetActions.openPoetDialog());
    dispatch(poetActions.selectPoet(poet));
    dispatch(poetActions.setWherePoetFrom('search'));
  };
  return (
    <View style={style.container}>
      {searchLoading && (
        <View style={style.loadingContainer}>
          <LoadingIndicator size="large" color={theme.colors.primary} title="搜索中..." />
        </View>
      )}
      {searchPoet.length !== 0 &&
        searchPoet.map((poet) => <PoetItem poet={poet} onPress={() => onPoetItemPress(poet)} key={poet.id} />)}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
  },
  loadingContainer: {
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
