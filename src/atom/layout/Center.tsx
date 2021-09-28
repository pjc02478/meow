import React from 'react';
import styled from 'styled-components/native';

type CenterProps = {
  children: React.ReactNode;
};
export const Center = ({
  children,
  ...props
}: CenterProps) => {
  return (
    <Container
      {...props}
    >
      {children}
    </Container>
  );
};

const Container = styled.View<Partial<CenterProps>>`
  flex: 1;

  align-items: center;
  justify-content: center;
`;
