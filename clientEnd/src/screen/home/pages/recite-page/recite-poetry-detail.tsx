import { useTheme } from '@react-navigation/native';
import React, { FC, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { MyButton } from 'src/common/component/button';
import { PageView } from 'src/common/component/page-view';
import { AppTheme } from 'src/common/types/types';
import { selectCurrentCollection, selectReciteCollectionPoetries } from 'src/state/recites/selectors';
import Swiper from 'react-native-swiper';
import { PoetryTitle } from '../../component/poetry-title';
import { PoetryAuthor } from '../../component/poetry-author';
import { PoetryParagraph } from '../../component/poetry-paragraph';
import { recitesActions } from 'src/state/recites/actions';

export const RecitePoetryDetail: FC = () => {
  const dispatch = useDispatch();
  const poetries = useSelector(selectReciteCollectionPoetries);
  const currentCollection = useSelector(selectCurrentCollection);

  const [isViewPoetry, setIsViewPoetry] = useState(false);

  const theme = useTheme() as AppTheme;

  const viewButtText = isViewPoetry ? '背诵' : '查看';
  const buttonType = isViewPoetry ? 'primary' : 'secondary';

  const switchReciteAndView = () => {
    setIsViewPoetry(!isViewPoetry);
  };

  const onFinishRecite = () => {
    currentCollection && dispatch(recitesActions.finishCollection(currentCollection.id));
  };

  const onIndexChangedHandler = () => {
    setIsViewPoetry(false);
  };

  const style = getStyle(theme);

  return (
    <PageView>
      <View style={style.container}>
        <Swiper showsHorizontalScrollIndicator loop={false} onIndexChanged={onIndexChangedHandler}>
          {poetries.map((poetry) => (
            <React.Fragment key={poetry.id}>
              <View style={style.poetryContainer}>
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
                  <PoetryTitle title={poetry.title} />
                  <PoetryAuthor author={poetry.author} />
                  {isViewPoetry && <PoetryParagraph paragraph={poetry.paragraphs} />}
                </ScrollView>
              </View>
            </React.Fragment>
          ))}
        </Swiper>
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

    poetryContainer: {
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
