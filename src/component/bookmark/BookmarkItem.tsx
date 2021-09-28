import React from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';

import { IBookmark } from 'model';

const { width: deviceWidth } = Dimensions.get('window');

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
  width: ${deviceWidth / 3}px;
  height: ${deviceWidth / 3}px;
`;
