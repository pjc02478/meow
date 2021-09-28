import React from 'react';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

import { IBookmark } from 'model';

interface BookmarkItemProps {
  data: IBookmark;
};
export const BookmarkItem = ({
  data,
}: BookmarkItemProps) => {

  return (
    <Container>
      <InnerImage
        source={{ uri: data.image.url }}
      />
    </Container>
  );
};

const Container = styled.View`
`;
const InnerImage = styled(FastImage).attrs({
  resizeMode: 'cover',
})`
  width: 160px;
  height: 160px;
`;
