import 'react-native';
import React, { useEffect } from 'react';
import { Text } from 'react-native';

import { IInfiniteDataProvider, prefetchFirstPage, withPrefetch } from 'data';

import { cleanup, fireEvent, render, act } from '@testing-library/react-native';

interface Foo {
  id: number;
};
class FooDataProvider implements IInfiniteDataProvider<Foo> {
  async get(pageSize: number, page: number) {
    return await (await fetch('/foo')).json();
  }
  async remove() {}
}

beforeEach(() => {
  jest.clearAllMocks();
});
afterEach(() => {
});

it('should prefetch on prefetchFirstPage', async () => {
  let fetched = false;

  fetch.mockResponseOnce(({ url }: { url: string }) => {
    if (!url.startsWith('/foo')) return;
    
    fetched = true;
    return Promise.resolve(JSON.stringify([...new Array(10)].map((x, idx) => ({
      id: idx,
    }))));
  });

  prefetchFirstPage(FooDataProvider, 10);

  expect(fetched).toEqual(true);
});

it('should return prefetched data', async () => {
  let fetched = false;

  fetch.mockResponseOnce(({ url }: { url: string }) => {
    if (!url.startsWith('/foo')) return;
    
    fetched = true;
    return Promise.resolve(JSON.stringify([...new Array(10)].map((x, idx) => ({
      id: idx,
    }))));
  });

  await act(async () => await prefetchFirstPage(FooDataProvider, 10));

  fetch.mockReject(() => Promise.reject('should not be fetched more than once'));

  const enhancedDataProvider = withPrefetch(FooDataProvider);
  const instance = new enhancedDataProvider();

  await act(async () => await instance.get(10, 0));

  expect(fetched).toEqual(true);
});
