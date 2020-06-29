import React from 'react';
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
import { selectReciteCollections } from 'src/state/recites/selectors';
import { Collection } from 'src/state/recites/types';
import { PageView } from 'src/common/component/page-view';

export const ReciteCollectionPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const reciteCollections = useSelector(selectReciteCollections);

  const goToCollection = (collection: Collection) => {
    // dispatch(.selectUserProfileReciteCollection(collection));
    dispatch(recitesActions.selectReciteCollection(collection));
    navigation.navigate(routes.collectionPoet);
  };
  return (
    <PageView style={style.container}>
      <ScrollView>
        {reciteCollections.map((collection: Collection) => (
          <CollectionItem key={collection.id} collection={collection} onPress={() => goToCollection(collection)} />
        ))}
      </ScrollView>
    </PageView>
  );
};

const style = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.85,
    width: Dimensions.get('window').width,
    padding: 16,
  },
});
