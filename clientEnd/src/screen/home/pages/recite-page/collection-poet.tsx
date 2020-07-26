import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import MyText from 'src/common/component/text';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { poetActions } from 'src/state/poet/actions';
import { Poet } from 'src/state/poet/types';
import { EmptyPrompt } from '../../component/empty-prompt';
import { PoetItem } from '../../component/poet-item';
import {
  selectCurrentCollection,
  selectReciteCollectionLoading,
  selectReciteCollectionPoets,
} from 'src/state/recites/selectors';
import { PageView } from 'src/common/component/page-view';
import { MyButton } from 'src/common/component/button';
import { routes } from 'src/screen/routes';

export const CollectionPoetPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentCollection = useSelector(selectCurrentCollection);
  const userReciteCollectionPoet = useSelector(selectReciteCollectionPoets);
  const isLoading = useSelector(selectReciteCollectionLoading);

  const { isFinished, name } = currentCollection || {};

  const onPoetItemPress = (poet: Poet) => {
    dispatch(poetActions.openPoetDialog('delete'));
    dispatch(poetActions.selectPoet(poet));
  };

  const navigateToRecitePage = () => navigation.navigate(routes.recitePoetDetail, { collectionName: name });

  return (
    <PageView>
      {userReciteCollectionPoet.length === 0 ? (
        <EmptyPrompt />
      ) : (
        <View style={{ height: '100%' }}>
          <ScrollView>
            {userReciteCollectionPoet.map((poet) => (
              <PoetItem key={poet.id} poet={poet} onPress={() => onPoetItemPress(poet)} />
            ))}
          </ScrollView>
          <View style={{ width: '100%', padding: 8 }}>
            {!isFinished && (
              <View>
                <MyButton
                  disabled={isLoading}
                  loading={isLoading}
                  type="primary"
                  title="开始背诵"
                  onPress={navigateToRecitePage}
                />
              </View>
            )}
          </View>
        </View>
      )}
    </PageView>
  );
};
