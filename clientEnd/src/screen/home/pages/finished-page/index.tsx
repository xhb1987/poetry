import React, { FC } from 'react';
import { Stack } from '..';
import { routes } from 'src/screen/routes';
import { FinishedPage } from './finished-page';
import { EditButton } from '../recite-page/component/edit-button';

export const FinishedScreen: FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={routes.finished}
      component={FinishedPage}
      options={{
        headerTitle: '已完成',
        headerBackTitleVisible: false,
        headerStyle: {
          shadowColor: 'transparent',
        },
        headerLeft: () => <EditButton />,
      }}
    />
  </Stack.Navigator>
);
