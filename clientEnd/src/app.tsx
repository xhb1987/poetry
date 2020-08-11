import React from 'react';
import { Text } from 'react-native';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { persistStore } from 'redux-persist';
import { Screen } from './screen';
import { IntlProvider } from 'react-intl';
import { PoetryModal } from './screen/home/modal/poetry-modal/poetry-modal';
import { AppTheme as Theme } from 'src/common/types/types';
import { DefaultTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AddCollectionModal } from './screen/home/modal/add-collection-modal';
import { Authentication } from './common/component/authentication';
import { FinishReciteModal } from './screen/home/modal/finish-recite-modal';
import { Notification } from './screen/home/component/notification';

Icon.loadFont();
const persistor = persistStore(store);

// React Native: App
export default function App() {
  const AppTheme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      tabColor: '#7CC5A1',
      primary: '#84DCC6',
      secondary: '#FFA69E',
      text: '#84DCC6',
      fontColor: '#373737',
      disabledColor: '#BFBFBF',
    },
  };
  return (
    // Redux: Global Store
    <Provider store={store}>
      {/* <IntlProvider locale="en"> */}

      {/* </IntlProvider> */}
      <PersistGate persistor={persistor}>
        <Authentication />
        <Notification theme={AppTheme} />
        <Screen theme={AppTheme} />
        <PoetryModal theme={AppTheme} />
        <AddCollectionModal theme={AppTheme} />
        <FinishReciteModal theme={AppTheme} />
      </PersistGate>
    </Provider>
  );
}
