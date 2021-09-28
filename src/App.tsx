import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications';
import { SWRConfig } from 'swr';

import { fetcher } from 'data/fetcher';
import { Navigation } from './Navigation';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <ToastProvider
        offsetBottom={60}
      >
        <SWRConfig
          value={{
            fetcher,
            suspense: true,
          }}
        >
          <Navigation />
        </SWRConfig>
      </ToastProvider>
    </SafeAreaView>
  );
};
export default App;
