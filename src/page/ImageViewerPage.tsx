import React from 'react';
import styled from 'styled-components/native';
import { useRoute } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

interface ImageViewPageParams {
  uri: string;
};
export const ImageViewerPage = ({

}) => {
  const route = useRoute();
  const {
    uri,
  } = route.params as ImageViewPageParams;

  return (
    <Container>
      <LargeImage
        source={{ uri: uri }}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;
const LargeImage = styled(FastImage).attrs({
  resizeMode: 'contain',
})`
  width: 100%;
  height: 100%;
`;
