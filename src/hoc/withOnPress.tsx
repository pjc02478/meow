import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const withOnPress = (Component: React.FC, hitSlop: number = 5) => (props: any) => {
  return (
    <TouchableOpacity
      disallowInterruption
      hitSlop={{ left: hitSlop, right: hitSlop, top: hitSlop, bottom: hitSlop }}
      onPress={props.onPress}
    >
      <Component {...props} />
    </TouchableOpacity>
  );
};
