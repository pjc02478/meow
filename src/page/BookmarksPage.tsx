import React, { useState } from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { BookmarkItem } from 'component/bookmark';
import { useBookmarkedCats } from 'data';
import { withSpinner } from 'hoc';
import { IBookmark } from 'model';

export const BookmarksPage = withSpinner(({

}) => {
  const [page, setPage] = useState(0);
  const {
    data: cats,
    loading,
    remove: removeBookmark,
  } = useBookmarkedCats(page);

  const onRemoveBookmark = (bookmark: IBookmark) => {
    removeBookmark(bookmark.id);
  };
  const onEndReached = () => {
    setPage(page => page + 1);
  };

  return (
    <Container>
      <FlatList
        data={cats}
        numColumns={3}
        keyExtractor={x => `${x.id}`}
        renderItem={({ item, ...props }) => (
          <BookmarkItem
            data={item}
            onRemove={() => onRemoveBookmark(item)}
            {...props}
          />
        )}
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
