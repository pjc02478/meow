import React from 'react';
import styled from 'styled-components/native';

type PushProps = {
};
export const Push = ({
  ...props
}: PushProps) => {
  return (
    <Container
      {...props}
    />
  );
};

const Container = styled.View`
  flex: 1;
`;
