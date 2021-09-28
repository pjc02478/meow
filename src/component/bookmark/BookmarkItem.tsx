import React, { memo } from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { IBookmark } from 'model';

const { width: deviceWidth } = Dimensions.get('window');

interface BookmarkItemProps {
  data: IBookmark;
};
export const BookmarkItem = memo(({
  data,
}: BookmarkItemProps) => {
  const navigation = useNavigation();

  const onPressImage = () => {
    navigation.navigate('ImageViewer', { uri: data.image.url });
  };

  return (
    <Container
      onPress={onPressImage}
    >
      <InnerImage
        source={{ uri: data.image.url }}
      />
    </Container>
  );
}, (prev: BookmarkItemProps, next: BookmarkItemProps) => {
  return prev.data?.id === next.data?.id;
});

const Container = styled(TouchableOpacity)`
`;
const InnerImage = styled(FastImage).attrs({
  resizeMode: 'cover',
})`
  width: ${deviceWidth / 3}px;
  height: ${deviceWidth / 3}px;
`;
