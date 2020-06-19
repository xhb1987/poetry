import React from 'react';
import { Text } from 'react-native';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { persistStore } from 'redux-persist';
import { Screen } from './screen';
import { IntlProvider } from 'react-intl';

// const persistor = persistStore(store);

// React Native: App
export default function App() {
  return (
    // Redux: Global Store
    <Provider store={store}>
      {/* <IntlProvider locale="en"> */}
      <Screen />
      {/* </IntlProvider> */}
      {/* <PersistGate loading={null} persistor={persistor}> */}
      {/* </PersistGate> */}
    </Provider>
  );
}
