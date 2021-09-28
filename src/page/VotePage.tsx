import React, { useCallback, useState } from 'react';
import styled from 'styled-components/native';
import { debounce } from 'lodash';

import { Push, Space } from 'atom/layout';
import { CatImage, CatImageState, VoteButtons } from 'component/vote';
import { useCat } from 'data';
import { withSpinner } from 'hoc';

export const VotePage = withSpinner(({

}) => {
  const [offset, setOffset] = useState(0);
  const cats = useCat(offset);

  const onVote = useCallback(debounce(() => {
    setOffset(offset => offset + 1);
  }, 500, { leading: true, trailing: false }), []);
  const onRollback = () => {
    setOffset(offset => offset - 1);
  };

  return (
    <Container>
      <Push />

      <CatImageContainer>
        {cats.map((x, idx) => x.id && (
          <CatImage
            key={x.id}
            state={IdxToState[idx]}
            data={x}
          />
        ))}
      </CatImageContainer>

      <Space height={40} />
      <VoteButtons
        data={cats[1]}
        onVote={onVote}
        onRollback={onRollback}
      />
      <Push />
    </Container>
  );
});

const IdxToState = [
  CatImageState.FadeOut,
  CatImageState.Active,
  CatImageState.FadeIn,
];

const Container = styled.View`
  flex: 1;

  align-items: center;
`;
const CatImageContainer = styled.View`
  width: 320px;
  height: 320px;
`;
