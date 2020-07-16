import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { selectPoetSearchLoading, selectPoetSearch } from 'src/state/poet/selector';
import { Poet } from 'src/state/poet/types';
import { poetActions } from 'src/state/poet/actions';
import { LoadingIndicator } from '../component/loading-indicator';
import { PoetItem } from '../component/poet-item';
import { PageView } from 'src/common/component/page-view';

export const SearchModal = () => {
  const dispatch = useDispatch();
  const searchLoading = useSelector(selectPoetSearchLoading);
  const searchPoet = useSelector(selectPoetSearch);
  const theme = useTheme();

  const onPoetItemPress = (poet: Poet) => {
    dispatch(poetActions.openPoetDialog('add'));
    dispatch(poetActions.selectPoet(poet));
  };
  return (
    <PageView style={style.container}>
      {searchLoading && (
        <View style={style.loadingContainer}>
          <LoadingIndicator size="large" color={theme.colors.primary} title="搜索中..." />
        </View>
      )}
      {searchPoet.length !== 0 &&
        searchPoet.map((poet) => <PoetItem poet={poet} onPress={() => onPoetItemPress(poet)} key={poet.id} />)}
    </PageView>
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
