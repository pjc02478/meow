import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { SWRConfig } from 'swr';

import { fetcher } from 'data/fetcher';
import { Navigation } from './Navigation';
import { Text } from 'react-native-paper';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <SWRConfig
        value={{
          fetcher,
          suspense: true,
        }}
      >
        <Navigation />
      </SWRConfig>
    </SafeAreaView>
  );
};
export default App;
