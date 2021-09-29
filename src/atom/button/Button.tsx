import React from 'react';
import { Button as MuiButton } from 'react-native-paper';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
};
export const Button = ({
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
