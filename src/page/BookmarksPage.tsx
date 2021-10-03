import React, { useState } from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { Text } from 'react-native-paper';

import { ListLoadingIndicator, RetryIndicator } from 'atom/feedback';
import { Center } from 'atom/layout';
import { Button } from 'atom/button';
import { BookmarkItem } from 'component/bookmark';
import { useBookmarkedCats } from 'data';
import { withSpinner } from 'hoc';
import { IBookmark } from 'model';

export const BookmarksPage = withSpinner(({

}) => {
  const {
    page,
    data: cats,
    loading,
    error,
    advance,
    retry,
    remove: removeBookmark,
  } = useBookmarkedCats();

  const onRemoveBookmark = (bookmark: IBookmark) => {
    removeBookmark(bookmark.id);
  };
  const onEndReached = () => {
    advance();
  };

  return (
    <Container>
      {!!error && (
        <RetryIndicator
          onRetry={() => retry()}
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
