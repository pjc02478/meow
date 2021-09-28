import React from 'react';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

import { ICat } from 'model';

interface CatImageProps {
  data: ICat;
};
export const CatImage = ({
  data,
}: CatImageProps) => {

  return (
    <Container>
      <InnerImage
        source={{ uri: data.url }}
      />
    </Container>
  );
};

const Container = styled.View`
`;
const InnerImage = styled(FastImage).attrs({
  resizeMode: 'cover',
})`
  width: 320px;
  height: 320px;
`;
