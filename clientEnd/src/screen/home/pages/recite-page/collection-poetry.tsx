import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import MyText from 'src/common/component/text';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { poetryActions } from 'src/state/poetry/actions';
import { Poetry } from 'src/state/poetry/types';
import { EmptyPrompt } from '../../component/empty-prompt';
import { PoetryItem } from '../../component/poetry-item';
import {
  selectCurrentCollection,
  selectReciteCollectionLoading,
  selectReciteCollectionPoetries,
} from 'src/state/recites/selectors';
import { PageView } from 'src/common/component/page-view';
import { MyButton } from 'src/common/component/button';
import { routes } from 'src/screen/routes';

export const CollectionPoetryPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentCollection = useSelector(selectCurrentCollection);
  const userReciteCollectionPoetries = useSelector(selectReciteCollectionPoetries);
  const isLoading = useSelector(selectReciteCollectionLoading);

  const { isFinished, name } = currentCollection || {};

  const onPoetryItemPress = (poetry: Poetry) => {
    dispatch(poetryActions.openPoetryDialog('delete'));
    dispatch(poetryActions.selectPoetry(poetry));
  };

  const navigateToRecitePage = () => navigation.navigate(routes.recitePoetryDetail, { collectionName: name });

  return (
    <PageView>
      {userReciteCollectionPoetries.length === 0 ? (
        <EmptyPrompt />
      ) : (
        <View style={{ height: '100%' }}>
          <ScrollView>
            {userReciteCollectionPoetries.map((poetry) => (
              <PoetryItem key={poetry.id} poetry={poetry} onPress={() => onPoetryItemPress(poetry)} />
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
