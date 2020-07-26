import React, { FC } from 'react';
import MyText from 'src/common/component/text';
import { useSelector } from 'react-redux';
import { selectFinishedCollections, selectUnfinishedCollections } from 'src/state/recites/selectors';
import { StyleSheet } from 'react-native';

export const CollectionSection: FC = () => {
  const finishedCollections = useSelector(selectFinishedCollections);
  const unfinishedCollections = useSelector(selectUnfinishedCollections);

  return (
    <>
      <MyText style={style.textStyle}> 恭喜你！</MyText>
      <MyText style={style.textStyle}>你完成了背诵 {finishedCollections.length} 个诗单</MyText>
      <MyText style={style.textStyle}>还有 {unfinishedCollections.length} 个背诵诗单在等着你哦！</MyText>
    </>
  );
};

const style = StyleSheet.create({
  textStyle: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 4,
    letterSpacing: 0.1,
  },
});
