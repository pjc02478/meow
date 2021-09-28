import React from 'react';
import styled from 'styled-components/native';
import { Button } from 'react-native-paper';

import { HorizontalLayout, Space } from 'atom/layout';
import { useVote } from 'data';
import { ICat, VoteKind } from 'model';

interface VoteButtonsProps {
  data: ICat;
  onVote: () => void;
};
export const VoteButtons = ({
  data,
  onVote,
}: VoteButtonsProps) => {
  const vote = useVote();

  const onPressVote = async (voteKind: VoteKind) => {
    try {
      await vote(data.id, voteKind);
      onVote();
    } catch(e) {
      console.error(e);
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
};

const Container = styled(HorizontalLayout)`
`;
const LikeButton = styled(Button).attrs({
  icon: 'like',
  mode: 'contained',
})`
`;
const DislikeButton = styled(Button).attrs({
  icon: 'dislike',
  mode: 'contained',
})`
`;
