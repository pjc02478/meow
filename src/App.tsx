import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Toast, { ToastProvider } from 'react-native-toast-notifications';
import { SWRConfig } from 'swr';

import { fetcher } from 'data/fetcher';
import { Navigation } from './Navigation';
import { prefetchFirstPage } from 'data/withPrefetch';
import { BookmarkedCatsDataProvider } from 'data';

const App = () => {

  //prefetchFirstPage(BookmarkedCatsDataProvider, 45);

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
        <Toast ref={(ref) =>  (global as any)['toast'] = ref} />
      </ToastProvider>
    </SafeAreaView>
  );
};
export default App;
