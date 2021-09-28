import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components/native';

type VerticalLayoutProps = {
  fill?: boolean;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};
export const VerticalLayout = ({
  fill = false,
  children,
  ...props
}: VerticalLayoutProps) => {
  return (
    <Container
      fill={fill}
      {...props}
    >
      {children}
    </Container>
  );
};

const Container = styled.View<Partial<VerticalLayoutProps>>`
  flex-direction: column;

  ${({ fill }: VerticalLayoutProps) => fill ? `
    flex: 1;
  ` : `
  `}
`;
