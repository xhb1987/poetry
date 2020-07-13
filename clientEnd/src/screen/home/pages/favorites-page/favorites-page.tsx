import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import MyText from 'src/common/component/text';
import { PoetItem } from '../../component/poet-item';
import { useSelector, useDispatch } from 'react-redux';
import { EmptyPrompt } from '../../component/empty-prompt';
import { useNavigation } from '@react-navigation/native';
import { poetActions } from 'src/state/poet/actions';
import { Poet } from 'src/state/poet/types';
import { selectFavoritePoets } from 'src/state/favorites/selectors';
import { PageView } from 'src/common/component/page-view';
import { authActions } from 'src/state/auth/actions';

export const FavoritesPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userFavorites = useSelector(selectFavoritePoets);

  const onPoetItemPress = (poet: Poet) => {
    dispatch(poetActions.openPoetDialog());
    dispatch(poetActions.selectPoet(poet));
    dispatch(poetActions.setWherePoetFrom('favorite'));
  };

  return (
    <PageView>
      <ScrollView>
        {userFavorites.length === 0 ? (
          <EmptyPrompt />
        ) : (
          userFavorites.map((poet) => <PoetItem key={poet.id} poet={poet} onPress={() => onPoetItemPress(poet)} />)
        )}
      </ScrollView>
    </PageView>
  );
};
