import 'react-native';
import React, { useEffect } from 'react';

import { withOnPress } from 'hoc';

import { cleanup, fireEvent, render, act } from '@testing-library/react-native';

const TestComponent = withOnPress(({
}) => {

  return (
    <>
      Hello
    </>
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
