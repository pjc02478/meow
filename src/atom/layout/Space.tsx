import React from 'react';
import { View } from 'react-native';

type SpaceProps = {
  width?: number;
  height?: number;
};
export const Space = ({
  width = 1,
  height = 1,
  ...props
}: SpaceProps) => {
  return (
    <View
      style={{ width, height }}
      {...props}
    />
  );
};
