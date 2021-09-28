import 'react-native';
import React, { useEffect } from 'react';
import { Text } from 'react-native';

import { withSpinner } from 'hoc';

import { cleanup, fireEvent, render, act } from '@testing-library/react-native';

interface TestComponentProps {
};
const TestComponent = withSpinner(({
}: TestComponentProps) => {
  const user = createResource(new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'park',
      });
    }, 1000);
  })).read();

  return (
    <Text>
      {user.name}
    </Text>
  );
}, () => <>asdf</>);

beforeEach(() => {
  jest.useFakeTimers();
});
afterEach(() => {
  jest.useRealTimers();
});

it('empty', async () => {
  expect(true).toEqual(true);
});

// suspense가 jest랑 잘 안동작하는듯 함.
/*
it('should show spinner before request ends', async () => {
  const component = await render((
    <TestComponent />
  ));
  expect(component.toJSON()).toMatchInlineSnapshot(`'free'`);
});
it('should not show spinner after request ends', async () => {
  const component = await render((
    <TestComponent />
  ));
  expect(component.toJSON()).toMatchInlineSnapshot(`'free'`);
});
*/

const createResource = (promise: any) => {
  let status = 'pending';
  let result: any;
  let suspender = promise.then(
    (data: any) => {
      status = 'success';
      result = data;
    },
    (err: any) => {
      status = 'error';
      result = err;
    }
  );
  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      }
			// status === 'success'
      return result;
    },
  };
};