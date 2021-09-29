import React from 'react';
import styled from 'styled-components/native';

import { Button } from 'atom/button';
import { HorizontalLayout, Space } from 'atom/layout';
import { useVote } from 'data';
import { ICat, VoteKind } from 'model';
import { withTask } from 'hoc';

interface VoteButtonsProps {
  data: ICat;
  onVote: () => void;
  onRollback: () => void;
};
export const VoteButtons = withTask<VoteButtonsProps>(({
  data,
  isBusy,
  runTask,
  onVote,
  onRollback,
}) => {
  const vote = useVote();

  const onPressVote = async (voteKind: VoteKind) => {
    if (isBusy) return;

    try {
      onVote();
      await runTask(() => vote(data.id, voteKind));
    } catch (e) {
      onRollback();
    }
  };

  return (
    <Container>
      <LikeButton
        onPress={() => onPressVote(VoteKind.Like)}
      >
        Love It
      </LikeButton>
      <Space width={40} />
      <DislikeButton
        onPress={() => onPressVote(VoteKind.Dislike)}
      >
        Nope It
      </DislikeButton>
    </Container>
  );
});

const Container = styled(HorizontalLayout)`
`;
const LikeButton = styled(Button).attrs({
  mode: 'contained',
})`
`;
const DislikeButton = styled(Button).attrs({
  mode: 'contained',
})`
`;
