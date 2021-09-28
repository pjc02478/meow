import React from 'react';
import FastImage from 'react-native-fast-image';
import SplashScreen from 'react-native-splash-screen';

interface InitialImageLoaderProps {
  uri: string;
};
export const InitialImageLoader = ({
  uri,
}: InitialImageLoaderProps) => {

  return (
    <FastImage
      style={{ display: 'none' }}
      source={{ uri }}
      onProgress={e => {
        if (e.nativeEvent.loaded === e.nativeEvent.total)
          SplashScreen.hide();
      }}
    />
  );
};
