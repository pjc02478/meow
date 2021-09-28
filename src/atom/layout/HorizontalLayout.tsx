import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components/native';

type HorizontalLayoutProps = {
  center?: boolean;
  fill?: boolean;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};
export const HorizontalLayout = ({
  center = false,
  fill = false,
  children,
  ...props
}: HorizontalLayoutProps) => {
  return (
    <Container
      center={center}
      fill={fill}
      {...props}
    >
      {children}
    </Container>
  );
};

const Container = styled.View<Partial<HorizontalLayoutProps>>`
  flex-direction: row;

  ${({ fill }: HorizontalLayoutProps) => fill ? `
    flex: 1;
  ` : `
  `}
  ${({ center }: HorizontalLayoutProps) => center ? `
    align-items: center;
  ` : `
  `}
`;
