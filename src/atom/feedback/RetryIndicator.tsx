import React from 'react';
import { Text } from 'react-native-paper';

import { Center } from 'atom/layout';
import { Button } from 'atom/button';

interface RetryIndicatorProps {
  onRetry: () => void;
};
export const RetryIndicator = ({
  onRetry,
}: RetryIndicatorProps) => {
  return (
    <Center>
      <Text>
        에러가 발생했습니다.
      </Text>
      <Button
        onPress={onRetry}
      >
        재시도
      </Button>
    </Center>
  );
};
