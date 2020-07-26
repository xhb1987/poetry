import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MyText from 'src/common/component/text';
import { useSelector, useDispatch } from 'react-redux';

import { ScrollView } from 'react-native-gesture-handler';
import { MyButton } from 'src/common/component/button';
import { CollectionItem } from '../../component/collection-item';
import { userActions } from 'src/state/user/actions';
import { useNavigation } from '@react-navigation/native';
import { routes } from 'src/screen/routes';
import { recitesActions } from 'src/state/recites/actions';
import {
  selectCollectionEdit,
  selectReciteCollectionLoading,
  selectUnfinishedCollections,
} from 'src/state/recites/selectors';
import { Collection } from 'src/state/recites/types';
import { PageView } from 'src/common/component/page-view';

export const ReciteCollectionPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const editMode = useSelector(selectCollectionEdit);
  const unfinishedCollections = useSelector(selectUnfinishedCollections);
  const isLoading = useSelector(selectReciteCollectionLoading);

  useEffect(() => {
    dispatch(recitesActions.editCollectionEnd());
  }, []);

  const goToCollection = (collection: Collection) => {
    const selectedCollection = unfinishedCollections.find((coll) => coll.id === collection.id);

    selectedCollection && dispatch(recitesActions.selectReciteCollection(selectedCollection));
    selectedCollection && navigation.navigate(routes.collectionPoet, { collectionName: selectedCollection.name });
  };

  const onCollectionCheck = (collections: Collection[]) => {
    setSelectedCollections(collections);
  };

  const [selectedCollections, setSelectedCollections] = useState<Collection[]>([]);

  const onDeleteClick = () => {
    const collectionIds = selectedCollections.map((collection) => collection.id);
    collectionIds.length && dispatch(recitesActions.deleteCollections(collectionIds));
  };

  return (
    <PageView style={style.container}>
      <ScrollView>
        {unfinishedCollections.map((collection: Collection) => (
          <CollectionItem
            onCollectionCheck={onCollectionCheck}
            collections={selectedCollections}
            key={collection.id}
            collection={collection}
            onPress={() => goToCollection(collection)}
          />
        ))}
      </ScrollView>
      {editMode && unfinishedCollections.length > 0 && (
        <MyButton loading={isLoading} disabled={isLoading} title="删除" type="secondary" onPress={onDeleteClick} />
      )}
    </PageView>
  );
};

const style = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.85,
    paddingBottom: 64,
  },
});
