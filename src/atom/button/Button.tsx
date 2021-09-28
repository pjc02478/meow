import React, { useCallback } from 'react';
import { Button as MuiButton } from 'react-native-paper';
import { debounce } from 'lodash';

const debounceOptions = {
  leading: true,
  trailing: false,
};

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

  const onPrePress = useCallback(debounce(() => {
    onPress?.();
  }, debounceDuration, debounceOptions), [debounce]);

  return (
    <MuiButton
      onPress={onPrePress}
      {...props}
    >
      {children}
    </MuiButton>
  );
};
