import React from'react';
import { ActivityIndicator } from 'react-native-paper';

export const withSpinner = (Component: React.FC) => (props: any) => {
  return (
    <React.Suspense
      fallback={<ActivityIndicator size="large" color="black" />}
    >
      <Component {...props} />
    </React.Suspense>
  );
};
