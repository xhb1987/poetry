import React from 'react';
import { View } from 'react-native';
import MyText from 'src/common/component/text';
import { PageView } from 'src/common/component/page-view';

export const FinishedPage = () => {
  return (
    <PageView>
      <MyText>Finished Page</MyText>
    </PageView>
  );
};
