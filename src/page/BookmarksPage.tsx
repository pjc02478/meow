import React from 'react';
import styled from 'styled-components/native';

import { useBookmarkedCats } from 'data';
import { BookmarkItem } from 'component/bookmark';
import { withSpinner } from 'hoc';
import { FlatList } from 'react-native';

export const BookmarksPage = withSpinner(({

}) => {
  const cats = useBookmarkedCats();

  return (
    <Container>
      <FlatList
        data={cats}
        keyExtractor={x => `${x.id}`}
        renderItem={({ item }) => <BookmarkItem data={item} />}
        numColumns={3}
      />
    </Container>
  );
});

const Container = styled.View`
  flex: 1;

  align-items: center;
`;
