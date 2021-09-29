import 'react-native';
import React, { useEffect } from 'react';
import { Text } from 'react-native';

import { withOnPress } from 'hoc';

import { cleanup, fireEvent, render, act } from '@testing-library/react-native';

const TestComponent = withOnPress(({
}) => {

  return (
    <Text>
      Hello
    </Text>
  );
});

beforeEach(() => {
  jest.useFakeTimers();
});
afterEach(() => {
  jest.useRealTimers();
});

it('should react to press event', async () => {
  let pressed = false;

  const component = await render((
    <TestComponent
      onPress={() => pressed = true}
    />
  ));

  expect(pressed).toEqual(false);

  await fireEvent.press(component.container);

  expect(pressed).toEqual(true);
});

it('should render children', async () => {
  const component = await render((
    <TestComponent
      onPress={() => {}}
    />
  ));

  expect(component.getByText('Hello')).toBeTruthy();
});
