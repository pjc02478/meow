import React from 'react';
import 'react-native-gesture-handler/jestSetup';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

jest.mock('react-native-fast-image', () => {
  const F = () => {
    return <></>
  };
  F.preload = jest.fn();
  return F;
});

jest.mock('react-native-splash-screen', () => {
  return {
    hide: jest.fn(),
  };
});

jest.mock('@react-navigation/core', () => {
  return {
    useRoute: jest.fn(() => {
      return {
        params: {},
      };
    }),
    useNavigation: jest.fn(() => {
      return jest.fn();
    }),
    useIsFocused: jest.fn(() => false),
  };
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
//jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
