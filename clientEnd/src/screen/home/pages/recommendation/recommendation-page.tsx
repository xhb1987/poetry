import React, { FC } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { PageView } from 'src/common/component/page-view';
import { recommendationActions } from 'src/state/recommendation/actions';
import { selectRecommendationLoading, selectRecommendationPoetry } from 'src/state/recommendation/selectors';
import { RefreshControl } from '../../component/refresh-controller';
import { RecommendationSection } from './component/recommendation-section';

export const RecommendationPage: FC = () => {
  const recommendationPoetries = useSelector(selectRecommendationPoetry);

  const isLoading = useSelector(selectRecommendationLoading);

  const dispatch = useDispatch();
  const onRefresh = () => dispatch(recommendationActions.fetchRecommendation());
  return (
    <PageView style={style.container}>
      <ScrollView refreshControl={<RefreshControl loading={isLoading} onRefresh={onRefresh} />}>
        {recommendationPoetries.map((recommendationPoetry) => (
          <React.Fragment key={recommendationPoetry.id}>
            <RecommendationSection recommendationPoetry={recommendationPoetry} />
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
