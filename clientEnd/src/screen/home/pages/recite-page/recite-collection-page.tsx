import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MyText from 'src/common/component/text';
import { useSelector, useDispatch } from 'react-redux';
import { selectReciteCollections } from 'src/state/user/selector';
import { ProfileReciteCollection, Profile } from 'src/state/user/types';
import { ScrollView } from 'react-native-gesture-handler';
import { MyButton } from 'src/common/component/button';
import { CollectionItem } from '../../component/collection-item';
import { userActions } from 'src/state/user/actions';
import { useNavigation } from '@react-navigation/native';
import { routes } from 'src/screen/routes';

export const ReciteCollectionPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const reciteCollections = useSelector(selectReciteCollections);

  const goToCollection = (collection: ProfileReciteCollection) => {
    dispatch(userActions.selectUserProfileReciteCollection(collection));
    navigation.navigate(routes.collectionPoet);
  };
  return (
    <View style={style.container}>
      <ScrollView>
        {reciteCollections.map((collection: ProfileReciteCollection) => (
          <CollectionItem key={collection.id} collection={collection} onPress={() => goToCollection(collection)} />
        ))}
      </ScrollView>
      <View>
        <MyButton
          style={{ alignItems: 'center', padding: 4 }}
          title="新建背诵单"
          onPress={() => console.log}
          type="primary"
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.85,
    width: Dimensions.get('window').width,
    padding: 16,
  },
});
