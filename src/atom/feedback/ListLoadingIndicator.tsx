import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { ActivityIndicator } from 'react-native-paper';

interface ListLoadingIndicatorProps {
  loading: boolean;
};
export const ListLoadingIndicator = ({
  loading,
}: ListLoadingIndicatorProps) => {
  const fade = useSharedValue(0);

  const style = useAnimatedStyle(() => ({
    transform: [ { translateY: (1 - fade.value) * 150 } ],
  }));
  useEffect(() => {
    fade.value = withTiming(
      loading ? 1 : 0,
      { duration: 600, easing: Easing.sin },
    );
  }, [loading]);

  return (
    <Container
      style={style}
    >
      <ActivityIndicator
        size="large"
      />
    </Container>
  );
};

const Container = styled(Animated.View)`
  position: absolute;
  bottom: 20px;

  width: 100%;

  align-items: center;
`;
