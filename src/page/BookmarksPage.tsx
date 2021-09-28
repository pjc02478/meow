import React, { useState } from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { BookmarkItem } from 'component/bookmark';
import { useBookmarkedCats } from 'data';
import { withSpinner } from 'hoc';

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
        numColumns={3}
        keyExtractor={x => `${x.id}`}
        renderItem={({ item }) => <BookmarkItem data={item} />}
        ListFooterComponent={loading ? <ActivityIndicator/> : <></>}
        onEndReachedThreshold={0.8}
        onEndReached={onEndReached}
      />
    </Container>
  );
});

const Container = styled.View`
  flex: 1;

  align-items: center;
`;
