import 'react-native';
import React, { useEffect } from 'react';
import { SWRConfig } from 'swr';
import FastImage from 'react-native-fast-image';

import { API_ENDPOINT, API_KEY } from 'react-native-dotenv';
import { fetcher } from 'data/fetcher';
import { useVote, useCat, useBookmarkedCats } from 'data';
import { ICat, VoteKind } from 'model';

import { cleanup, fireEvent, render, act, waitFor } from '@testing-library/react-native';
import { renderHook } from '@testing-library/react-hooks';

const PageSize = 45;

beforeEach(() => {
  jest.clearAllMocks();
});
afterEach(() => {
});

describe('useCat', () => {
  const response = require('../catapi/search').default;

  beforeAll(() => {
    fetch.mockResponseOnce(({ url }: { url: string }) => {
      if (!url.startsWith(API_ENDPOINT + '/images/search'))
        return Promise.reject('unexpected call');
      return Promise.resolve(JSON.stringify(response));
    });
  });
  afterAll(() => {
    fetch.mockClear();
  });

  it('should return array of cats', async () => {
    let cats: ICat[];
    const App = () => {
      cats = useCat(0);
      return <></>;
    };

    render((
      <SWRConfig value={{ dedupingInterval: 0, fetcher }}>
        <App />
      </SWRConfig>
    ));

    expect(cats!).not.toBeNull();
    // always return array that length of 3
    expect(cats!).toHaveLength(3);

    await waitFor(() => !!cats[1].id);
    
    expect(Object.values(cats![0])).toHaveLength(0);
    expect(cats![1].id).toEqual(response[0].id);
    expect(cats![2].id).toEqual(response[1].id);
  });

  it('should not refetch on offset change', async () => {
    let cats: ICat[];
    const App = ({ offset }: { offset: number }) => {
      cats = useCat(offset);
      return <></>;
    };

    const r = render((
      <SWRConfig value={{ dedupingInterval: 0, fetcher }}>
        <App offset={0} />
      </SWRConfig>
    ));
    await waitFor(() => !!cats[1].id);
    expect(fetch).toHaveBeenCalledTimes(1);
    
    r.rerender((
      <SWRConfig value={{ dedupingInterval: 0, fetcher }}>
        <App offset={1} />
      </SWRConfig>
    ));
    await waitFor(() => !!cats[0].id);
    expect(fetch).toHaveBeenCalledTimes(1);
  });


  // ?????? 10~19????????? ?????? ???????????? 10????????? ???????????? ??????
  // 0~9??? ???????????? ???????????? ???
  it('should prefetch next chunk', async () => {
    let cats: ICat[];
    const App = ({ offset }: { offset: number }) => {
      cats = useCat(offset);
      return <></>;
    };

    const r = render((
      <SWRConfig value={{ dedupingInterval: 0, fetcher }}>
        <App offset={0} />
      </SWRConfig>
    ));
    await waitFor(() => !!cats[1].id);

    // ??????????????? ?????????????????? ?????????????????? ???????????? ?????? private ????????????
    // ?????? 10?????? ??? ???????????????.
    for (let i=0; i<10; i++) {
      r.rerender((
        <SWRConfig value={{ dedupingInterval: 0, fetcher }}>
          <App offset={i} />
        </SWRConfig>
      ))
      await waitFor(() => !!cats[1].id);
    }

    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('should prefetch image data', async () => {
    let cats: ICat[];
    let mockPreloaded: string[] = new Array();

    FastImage.preload.mockImplementation((ary: string[]) => {
      mockPreloaded = mockPreloaded.concat(ary);
    });

    const App = ({ offset }: { offset: number }) => {
      cats = useCat(offset);
      return <></>;
    };

    const r = render((
      <SWRConfig value={{ dedupingInterval: 0, fetcher }}>
        <App offset={0} />
      </SWRConfig>
    ));
    await waitFor(() => !!cats[1].id);

    expect(FastImage.preload).toHaveBeenCalledTimes(1);
    // ????????? url??? ?????? UI?????? ????????? ??????????????? ????????????????????? preload ??? ?????? ??????
    expect(mockPreloaded).toContainEqual({ uri: response[1].url });
    expect(mockPreloaded).toContainEqual({ uri: response[2].url });
  });
});

describe('useBookmarkedCats', () => {
  const response = require('../catapi/favourites').default;

  beforeAll(() => {
    fetch.mockResponse(({ url }: { url: string }) => {
      if (!url.startsWith(API_ENDPOINT + '/favourites'))
        return Promise.reject('unexpected call');
      return Promise.resolve(JSON.stringify(response));
    });
  });
  afterAll(() => {
    fetch.mockClear();
  });

  it('should fetch bookmarked data', async () => {
    const r = renderHook(() => {
      const data = useBookmarkedCats();
      return data;
    });

    expect(fetch).toHaveBeenCalledWith(
      API_ENDPOINT + `/favourites?limit=${PageSize}&page=0`,
      {"headers": {"x-api-key": API_KEY}}
    );
  });

  it('should fetch next page on advance', async () => {
    const r = renderHook(() => {
      return useBookmarkedCats();
    });

    expect(fetch).toHaveBeenCalledWith(
      API_ENDPOINT + `/favourites?limit=${PageSize}&page=0`,
      {"headers": {"x-api-key": API_KEY}}
    );

    await waitFor(() => !r.result.current.loading);
    await act(async () => await r.result.current.advance());

    expect(fetch).toHaveBeenCalledWith(
      API_ENDPOINT + `/favourites?limit=${PageSize}&page=1`,
      {"headers": {"x-api-key": API_KEY}}
    );
  });

  // ?????? ????????? ????????? ???????????? advance??? ????????????
  // ?????? ???????????? ???????????? ??????
  it('should not advance on fetch error', async () => {
    fetch.mockResponseOnce(({ url }: { url: string }) => {
      console.log('no way');
      return Promise.reject('no way');
    });

    const r = renderHook(() => {
      return useBookmarkedCats();
    });

    expect(fetch).toHaveBeenCalledWith(
      API_ENDPOINT + `/favourites?limit=${PageSize}&page=0`,
      {"headers": {"x-api-key": API_KEY}}
    );

    await waitFor(() => !r.result.current.loading);
    await act(async () => await r.result.current.advance());

    expect(fetch).not.toHaveBeenCalledWith(
      API_ENDPOINT + `/favourites?limit=${PageSize}&page=1`,
      {"headers": {"x-api-key": API_KEY}}
    );
  });

});

describe('useVote', () => {
  it('should make votes', async () => {
    const vote = useVote();

    vote('test_id', VoteKind.Like);
    expect(fetch).toHaveBeenCalledWith(
      API_ENDPOINT + '/votes',
      {"body": `{\"image_id\":\"test_id\",\"value\":${VoteKind.Like}}`, "headers": {"Content-Type": "application/json", "x-api-key": API_KEY}, "method": "POST"}
    );

    vote('test_id', VoteKind.Dislike);
    expect(fetch).toHaveBeenCalledWith(
      API_ENDPOINT + '/votes',
      {"body": `{\"image_id\":\"test_id\",\"value\":${VoteKind.Dislike}}`, "headers": {"Content-Type": "application/json", "x-api-key": API_KEY}, "method": "POST"}
    );
  });

  it('should add to bookmark on like', async () => {
    const vote = useVote();

    vote('test_id', VoteKind.Like);
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(
      API_ENDPOINT + '/favourites',
      {"body": `{\"image_id\":\"test_id\"}`, "headers": {"Content-Type": "application/json", "x-api-key": API_KEY}, "method": "POST"}
    );
  });

  it('should not add to bookmark on dislike', async () => {
    const vote = useVote();

    vote('test_id', VoteKind.Dislike);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
