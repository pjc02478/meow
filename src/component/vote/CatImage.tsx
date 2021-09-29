import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { ICat } from 'model';

export enum CatImageState {
  FadeIn,
  Active,
  FadeOut,
};

interface CatImageProps {
  state: CatImageState;
  data: ICat;
};
export const CatImage = ({
  state,
  data,
}: CatImageProps) => {
  const value = useSharedValue(StateToValue[state]);

  useEffect(() => {
    value.value = withTiming(StateToValue[state], {
      duration: 500,
    });
  }, [state]);
  const styles = useAnimatedStyle(() => ({
    opacity: 1 - Math.abs(value.value),
    transform: [{ translateX: (value.value) * 360 }],
  }), []);

  return (
    <Container
      style={styles}
    >
      <InnerImage
        source={{ uri: data.url }}
      />
    </Container>
  );
};

const StateToValue = {
  [CatImageState.Active]: 0,
  [CatImageState.FadeIn]: 1,
  [CatImageState.FadeOut]: -1,
};

const Container = styled(Animated.View)`
  position: absolute;
  left: 0px;
  top: 0px;
`;
const InnerImage = styled(FastImage).attrs({
  resizeMode: 'cover',
})`
  width: 320px;
  height: 320px;
`;
