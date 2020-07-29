import React, { FC } from 'react';
import { Stack } from '..';
import { routes } from 'src/screen/routes';
import { RecommendationPage } from './recommendation-page';

export const RecommendationScreen: FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={routes.recommendation}
      component={RecommendationPage}
      options={{
        headerTitle: '',
        headerBackTitleVisible: false,
        headerStyle: {
          shadowColor: 'transparent',
        },
      }}
    />
  </Stack.Navigator>
);
