import 'react-native';
import React, { useEffect } from 'react';

import { withTask } from 'hoc';

import { cleanup, fireEvent, render, act } from '@testing-library/react-native';

const heavyTask = (success = true) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success)
        resolve(0);
      else
        reject();
    }, 1000);
  });
};

const TestComponent = withTask<any>(({
  start = false,
  task,
  isBusy,
  runTask
}) => {

  useEffect(() => {
    if (start)
      runTask(task);
  }, [start]);

  return (
    <>
      {isBusy ? 'busy' : 'free'}
    </>
  );
});

beforeEach(() => {
  jest.useFakeTimers();
});
afterEach(() => {
  jest.useRealTimers();
});

it('should start with free state', async () => {
  const component = await render((
    <TestComponent
      start={false}
      task={() => heavyTask(true)}
    />
  ));
  expect(component.toJSON()).toMatchInlineSnapshot(`"free"`);
});

it('should set as `busy` after task starts', async () => {
  const component = await render((
    <TestComponent
      start={true}
      task={() => heavyTask(true)}
    />
  ));
  expect(component.toJSON()).toMatchInlineSnapshot(`"busy"`);
});

it('should set as `free` after task ends', async () => {
  const component = await render((
    <TestComponent
      start={false}
      task={() => heavyTask(true)}
    />
  ));
  jest.runAllTimers();
  expect(component.toJSON()).toMatchInlineSnapshot(`"free"`);
});

it('should set as `free` even if task throws an exception', async () => {
  const component = await render((
    <TestComponent
      start={false}
      task={() => heavyTask(false)}
    />
  ));
  jest.runAllTimers();
  expect(component.toJSON()).toMatchInlineSnapshot(`"free"`);
});
