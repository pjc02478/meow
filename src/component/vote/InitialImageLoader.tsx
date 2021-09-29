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
    // fallback:
    //   If the image is not loaded for more than 1 second
    //   for any reason, proceed to app screen anyway.
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
