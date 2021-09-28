import React from'react';
import { ActivityIndicator } from 'react-native-paper';

export const withSpinner = (Component: React.FC, SpinnerComponent?: React.FC) => (props: any) => {
  return (
    <React.Suspense
      fallback={SpinnerComponent || DefaultSpinner}
    >
      <Component {...props} />
    </React.Suspense>
  );
};

const DefaultSpinner = () => {
  return (
    <ActivityIndicator
      size="large"
      color="black"
    />
  );
};
