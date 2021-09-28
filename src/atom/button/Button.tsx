import React from 'react';
import { Button as MuiButton } from 'react-native-paper';

interface ButtonProps {
  debounce?: number;
  children: React.ReactNode;
  onPress: () => void;
};
export const Button = ({
  debounce: debounceDuration = 0,
  children,
  onPress,
  ...props
}: ButtonProps) => {

  return (
    <MuiButton
      onPress={onPress}
      {...props}
    >
      {children}
    </MuiButton>
  );
};
