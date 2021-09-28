import React from 'react';
import styled from 'styled-components/native';
import { Button } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';

import { HorizontalLayout, Space } from 'atom/layout';
import { useVote } from 'data';
import { ICat, VoteKind } from 'model';

interface VoteButtonsProps {
  data: ICat;
  onVote: () => void;
  onRollback: () => void;
};
export const VoteButtons = ({
  data,
  onVote,
  onRollback,
}: VoteButtonsProps) => {
  const toast = useToast();
  const vote = useVote();

  const onPressVote = async (voteKind: VoteKind) => {
    try {
      onVote();
      await vote(data.id, voteKind);
    } catch(e) {
      console.error(e);
      toast.show('에러가 발생했습니다.', { type: 'danger' });
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
