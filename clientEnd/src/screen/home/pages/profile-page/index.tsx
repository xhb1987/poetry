import React, { FC } from 'react';
import { Stack } from '..';
import { routes } from 'src/screen/routes';
import { ProfilePage } from './profile-page';
import { LoginAndLogoutButton } from './component/login-and-logout';

export const ProfileScreen: FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={routes.profile}
      component={ProfilePage}
      options={{
        headerTitle: '',
        headerBackTitleVisible: false,
        headerStyle: {
          shadowColor: 'transparent',
        },
        headerRight: () => <LoginAndLogoutButton />,
      }}
    />
  </Stack.Navigator>
);
