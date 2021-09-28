import React, { useState } from 'react';
import styled from 'styled-components/native';

import { useBookmarkedCats } from 'data';
import { BookmarkItem } from 'component/bookmark';
import { withSpinner } from 'hoc';
import { FlatList } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export const BookmarksPage = withSpinner(({

}) => {
  const [page, setPage] = useState(0);
  const {
    data: cats,
    loading,
  } = useBookmarkedCats(page);

  const onEndReached = () => {
    setPage(page => page + 1);
  };

  return (
    <Container>
      <FlatList
        data={cats}
        keyExtractor={x => `${x.id}`}
        renderItem={({ item }) => <BookmarkItem data={item} />}
        numColumns={3}
        onEndReachedThreshold={0.8}
        onEndReached={onEndReached}
        ListFooterComponent={loading ? <ActivityIndicator/> : <></>}
      />
    </Container>
  );
});

const Container = styled.View`
  flex: 1;

  align-items: center;
`;
