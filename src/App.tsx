import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Toast, { ToastProvider } from 'react-native-toast-notifications';
import { SWRConfig } from 'swr';

import { fetcher } from 'data/fetcher';
import { BookmarkedCatsDataProvider, prefetchFirstPage } from 'data';
import { Navigation } from './Navigation';

const App = () => {
  prefetchFirstPage(BookmarkedCatsDataProvider, 45);

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
        <Toast ref={(ref) => (global as any).toast = ref} />
      </ToastProvider>
    </SafeAreaView>
  );
};
export default App;
