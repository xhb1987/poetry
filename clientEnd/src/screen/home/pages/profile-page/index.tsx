import React, { FC } from 'react';
import { Stack } from '..';
import { routes } from 'src/screen/routes';
import { ProfilePage } from './profile-page';

export const ProfileScreen: FC = () => (
  <Stack.Navigator>
    <Stack.Screen name={routes.profile} component={ProfilePage} />
  </Stack.Navigator>
);
