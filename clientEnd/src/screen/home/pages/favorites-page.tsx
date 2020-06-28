import React from 'react';
import { View, ScrollView } from 'react-native';
import MyText from 'src/common/component/text';
import { PoetItem } from '../component/poet-item';
import { useSelector, useDispatch } from 'react-redux';
import { selectFavorite } from 'src/state/user/selector';
import { EmptyPrompt } from '../component/empty-prompt';
import { useNavigation } from '@react-navigation/native';
import { poetActions } from 'src/state/poet/actions';
import { Poet } from 'src/state/poet/types';

export const FavoritesPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userFavorites = useSelector(selectFavorite);

  const onPoetItemPress = (poet: Poet) => {
    dispatch(poetActions.openPoetDialog());
    dispatch(poetActions.selectPoet(poet));
    dispatch(poetActions.setWherePoetFrom('favorite'));
  };
  return (
    <ScrollView>
      {userFavorites.length === 0 ? (
        <EmptyPrompt />
      ) : (
        userFavorites.map((poet) => <PoetItem key={poet.id} poet={poet} onPress={() => onPoetItemPress(poet)} />)
      )}
    </ScrollView>
  );
};