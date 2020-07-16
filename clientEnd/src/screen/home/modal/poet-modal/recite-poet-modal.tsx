import React, { FC, useState, useEffect } from 'react';
import MyText from 'src/common/component/text';
import { View, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectSelectedPoet, selectPoetDialog, selectWherePoetFrom } from 'src/state/poet/selector';
import Modal from 'react-native-modal';
import { poetActions } from 'src/state/poet/actions';
import { AppTheme } from 'src/common/types/types';
import { MyButton } from 'src/common/component/button';
import { selectFavoritePoets } from 'src/state/favorites/selectors';
import { selectFinishedPoets } from 'src/state/finished/selectors';
import { selectReciteCollectionPoets } from 'src/state/recites/selectors';
import { PoetDialogType } from 'src/state/poet/types';
import { AddPoetModal } from './add-poet-modal';
import { ViewPoetModal } from './view-poet-modal';

export const RecitePoetModal: FC<{ theme: AppTheme }> = ({ theme, children }) => {
  const dispatch = useDispatch();
  const selectedPoet = useSelector(selectSelectedPoet);
  const poetDialog = useSelector(selectPoetDialog);
  const poetFrom = useSelector(selectWherePoetFrom);

  const isFromSearch = poetFrom === 'search';
  const [isViewPoet, setIsViewPoet] = useState(false);
  useEffect(() => setIsViewPoet(isFromSearch), [isFromSearch]);

  const favorite = useSelector(selectFavoritePoets);
  const finished = useSelector(selectFinishedPoets);
  const recite = useSelector(selectReciteCollectionPoets);

  const poetCollection = () => {
    switch (poetFrom) {
      case 'favorite':
        return favorite;
      case 'finished':
        return finished;
      case 'recite':
        return recite;
      default:
        return [];
    }
  };

  const collection = poetCollection();
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;

  const style = getStyle(theme);

  const paragraphs = selectedPoet?.paragraphs.split('。').filter((content) => content);

  const switchReciteAndView = () => {
    setIsViewPoet(!isViewPoet);
  };

  const closeDialog = () => {
    dispatch(poetActions.closePoetDialog());
  };

  const totalPoet = collection.length;
  const currentPoet = collection.findIndex((p) => p.id === selectedPoet?.id);
  const isLastPoet = currentPoet + 1 === collection.length;
  const isFirstPoet = currentPoet === 0;

  const nextPoet = () => {
    const nextPoet = collection[currentPoet + 1];
    nextPoet && dispatch(poetActions.selectPoet(nextPoet));
  };

  const previousPoet = () => {
    const collection = poetCollection();

    const previousPoet = collection[currentPoet - 1];
    previousPoet && dispatch(poetActions.selectPoet(previousPoet));
  };

  const viewButtText = isViewPoet ? '背诵' : '查看';
  const buttonType = isViewPoet ? 'primary' : 'secondary';

  return (
    <Modal
      backdropOpacity={0.8}
      onBackdropPress={closeDialog}
      isVisible={poetDialog}
      deviceHeight={deviceHeight}
      deviceWidth={deviceWidth}
    >
      <View style={style.container}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
        >
          {!isFromSearch && (
            <>
              <View>
                {totalPoet > 1 && (
                  <MyButton
                    disabled={isFirstPoet}
                    title={'上一首'}
                    theme={theme}
                    onPress={previousPoet}
                    type={'primary'}
                  />
                )}
              </View>
              <MyText>
                {currentPoet + 1} / {totalPoet}
              </MyText>
              <View>
                {totalPoet > 1 && (
                  <MyButton disabled={isLastPoet} title={'下一首'} theme={theme} onPress={nextPoet} type={'primary'} />
                )}
              </View>
            </>
          )}
        </View>
        {children}
        {!isFromSearch && (
          <MyButton
            style={{ alignItems: 'center', padding: 4 }}
            theme={theme}
            title={viewButtText}
            type={buttonType}
            onPress={switchReciteAndView}
          />
        )}
      </View>
    </Modal>
  );
};

const getStyle = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: 'white',
      borderColor: theme.colors.primary,
      borderWidth: 1,
      borderRadius: 5,
      borderStyle: 'solid',
      padding: 16,
    },
    contentContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: Dimensions.get('window').height * 0.6,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 24,
    },
    author: {
      paddingVertical: 16,
    },
    content: {
      paddingVertical: 5,
      fontSize: 18,
    },
  });
