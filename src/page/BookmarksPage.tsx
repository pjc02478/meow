import React, { useState } from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { ListLoadingIndicator, RetryIndicator } from 'atom/feedback';
import { BookmarkItem } from 'component/bookmark';
import { useBookmarkedCats } from 'data';
import { withSpinner } from 'hoc';
import { IBookmark } from 'model';
import { Center } from 'atom/layout';
import { Button } from 'atom/button';
import { Text } from 'react-native-paper';

export const BookmarksPage = withSpinner(({

}) => {
  const [page, setPage] = useState(0);
  const {
    data: cats,
    loading,
    error,
    refetch,
    remove: removeBookmark,
  } = useBookmarkedCats(page);

  console.log('cats', cats);

  const onRemoveBookmark = (bookmark: IBookmark) => {
    removeBookmark(bookmark.id);
  };
  const onEndReached = () => {
    setPage(page => page + 1);
  };

  return (
    <Container>
      {!!error && (
        <RetryIndicator
          onRetry={() => refetch(page)}
        />
      )}

      <FlatList
        data={cats}
        numColumns={3}
        initialNumToRender={6}
        windowSize={6}
        keyExtractor={x => `${x.id}`}
        renderItem={({ item, ...props }) => (
          <BookmarkItem
            data={item}
            onRemove={() => onRemoveBookmark(item)}
            {...props}
          />
        )}
        onEndReachedThreshold={0.5}
        onEndReached={onEndReached}
      />
      <ListLoadingIndicator
        loading={loading}
      />
    </Container>
  );
});

const Container = styled.View`
  flex: 1;

  align-items: center;
`;
