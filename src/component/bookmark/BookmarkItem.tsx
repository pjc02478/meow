import React, { memo, useEffect } from 'react';
import styled from 'styled-components/native';
import { Alert, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { HorizontalLayout, Push } from 'atom/layout';
import { IBookmark } from 'model';
import { withOnPress } from 'hoc';

const { width: deviceWidth } = Dimensions.get('window');

interface BookmarkItemProps {
  data: IBookmark;
  onRemove: () => void;
};
export const BookmarkItem = memo(({
  data,
  onRemove,
}: BookmarkItemProps) => {
  const navigation = useNavigation();

  const onPressImage = () => {
    navigation.navigate('ImageViewer', { uri: data.image.url });
  };
  const onPressRemove = () => {
    Alert.alert('', 'Do you really want to remove this cat from the list?', [
      {
        style: 'cancel',
        text: 'No',
      },
      {
        style: 'destructive',
        text: 'Yes',
        onPress: onRemove,
      }
    ])
  };

  return (
    <Container
      onPress={onPressImage}
    >
      <InnerImage
        source={{ uri: data.image.url }}
      />

      <HorizontalLayout fill>
        <Push />
        <RemoveIcon
          onPress={onPressRemove}
        />
      </HorizontalLayout>
    </Container>
  );
}, (prev: BookmarkItemProps, next: BookmarkItemProps) => {
  return prev.data?.id === next.data?.id;
});

const Container = styled(TouchableOpacity)`
  width: ${deviceWidth / 3}px;
  height: ${deviceWidth / 3}px;
`;
const InnerImage = styled(FastImage).attrs({
  resizeMode: 'cover',
})`
  position: absolute;
  left: 0px;
  top: 0px;

  width: 100%;
  height: 100%;
`;

const RemoveIcon = withOnPress(styled(Ionicons).attrs({
  name: 'close-circle',
  size: 28,
})`
`);
