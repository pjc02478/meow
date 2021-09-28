import React, { useState } from 'react';
import styled from 'styled-components/native';

import { useCat } from 'data';
import { CatImage, VoteButtons } from 'component/vote';
import { ActivityIndicator, Text } from 'react-native-paper';
import { Push, Space } from 'atom/layout';
import { withSpinner } from 'hoc';

export const VotePage = withSpinner(({

}) => {
  const [offset, setOffset] = useState(0);
  const cat = useCat(offset);

  const onVote = () => {
    setOffset(offset + 1);
  };

  return (
    <Container>
      <Push />
      <CatImage
        data={cat}
      />
      <Space height={40} />
      <VoteButtons
        data={cat}
        onVote={onVote}
      />
      <Push />
    </Container>
  );
});

const Container = styled.View`
  flex: 1;

  align-items: center;
`;
