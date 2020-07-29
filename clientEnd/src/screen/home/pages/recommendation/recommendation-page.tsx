import React, { FC, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { MyButton } from 'src/common/component/button';
import { PageView } from 'src/common/component/page-view';
import MyText from 'src/common/component/text';
import { recommendationActions } from 'src/state/recommendation/actions';
import { selectRecommendationPoet } from 'src/state/recommendation/selectors';
import { RecommendationSection } from './component/recommendation-section';

export const RecommendationPage: FC = () => {
  const dispatch = useDispatch();
  const recommendationPoets = useSelector(selectRecommendationPoet);

  return (
    <PageView style={style.container}>
      <ScrollView>
        {recommendationPoets.map((recommendationPoet) => (
          <React.Fragment key={recommendationPoet.id}>
            <RecommendationSection recommendationPoet={recommendationPoet} />
          </React.Fragment>
        ))}
      </ScrollView>
    </PageView>
  );
};

const style = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.85,
    paddingBottom: 64,
  },
});
