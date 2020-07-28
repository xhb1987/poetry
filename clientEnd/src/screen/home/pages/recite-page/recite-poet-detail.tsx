import { useTheme } from '@react-navigation/native';
import React, { FC, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { MyButton } from 'src/common/component/button';
import { PageView } from 'src/common/component/page-view';
import { AppTheme } from 'src/common/types/types';
import { selectCurrentCollection, selectReciteCollectionPoets } from 'src/state/recites/selectors';
import Swiper from 'react-native-swiper';
import { PoetTitle } from '../../component/poet-title';
import { PoetAuthor } from '../../component/poet-author';
import { PoetParagraph } from '../../component/poet-paragraph';
import { recitesActions } from 'src/state/recites/actions';

export const RecitePoetDetail: FC = () => {
  const dispatch = useDispatch();
  const poets = useSelector(selectReciteCollectionPoets);
  const currentCollection = useSelector(selectCurrentCollection);

  const [isViewPoet, setIsViewPoet] = useState(false);

  const theme = useTheme() as AppTheme;

  const viewButtText = isViewPoet ? '背诵' : '查看';
  const buttonType = isViewPoet ? 'primary' : 'secondary';

  const switchReciteAndView = () => {
    setIsViewPoet(!isViewPoet);
  };

  const onFinishRecite = () => {
    currentCollection && dispatch(recitesActions.finishCollection(currentCollection.id));
  };

  const onIndexChangedHandler = () => {
    setIsViewPoet(false);
  };

  const style = getStyle(theme);

  return (
    <PageView>
      <View style={style.container}>
        <Swiper showsHorizontalScrollIndicator loop={false} onIndexChanged={onIndexChangedHandler}>
          {poets.map((poet) => (
            <React.Fragment key={poet.id}>
              <View style={style.poetContainer}>
                <View style={{ width: '100%', padding: 8, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                  <MyButton theme={theme} title={viewButtText} type={buttonType} onPress={switchReciteAndView} />
                </View>
                <ScrollView
                  contentContainerStyle={{
                    display: 'flex',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <PoetTitle title={poet.title} />
                  <PoetAuthor author={poet.author} />
                  {isViewPoet && <PoetParagraph paragraph={poet.paragraphs} />}
                </ScrollView>
              </View>
            </React.Fragment>
          ))}
        </Swiper>
        {/* </ScrollView> */}
      </View>
      <View style={{ width: '100%', padding: 8 }}>
        <MyButton theme={theme} title="完成" type={'primary'} onPress={onFinishRecite} />
      </View>
    </PageView>
  );
};

const getStyle = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      height: Dimensions.get('window').height * 0.805,
      width: Dimensions.get('window').width,
      display: 'flex',
      padding: 28,
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },

    poetContainer: {
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: theme.colors.primary,
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 4,
      marginHorizontal: 8,
    },
  });
