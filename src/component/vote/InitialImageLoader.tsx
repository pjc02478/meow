import React, { useEffect } from 'react';
import FastImage from 'react-native-fast-image';
import SplashScreen from 'react-native-splash-screen';

interface InitialImageLoaderProps {
  uri: string;
};
export const InitialImageLoader = ({
  uri,
}: InitialImageLoaderProps) => {

  useEffect(() => {
    const tid = setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
    return () => clearTimeout(tid);
  }, []);

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
