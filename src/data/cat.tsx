import { useEffect, useState } from 'react';
import FastImage from 'react-native-fast-image';
import useSWR, { useSWRConfig } from 'swr';

import { IBookmark, ICat, VoteKind } from 'model';
import { fetcher, HttpMethods, mutator } from './fetcher';
import { IInfiniteDataProvider, useInfiniteData } from 'data';

const PageSize = 45;
const LoadPerRequest = 10;
const Threshold = 0.7;

interface ICatResponse extends Array<ICat> {
};

class BookmarkedCatsDataProvider implements IInfiniteDataProvider<IBookmark> {
  async get(pageSize: number, page: number) {
    return await fetcher(
      `/favourites?limit=${pageSize}&page=${page}`,
    );
  }
  async remove(id: number) {
    await mutator(
      `/favourites/${id}`,
      {},
      HttpMethods.Delete,
    );
  }
};

export const useBookmarkedCats = (page: number) => {
  return useInfiniteData(BookmarkedCatsDataProvider, page, {
    pageSize: PageSize,
  });
};

export const useVote = () => {
  return async (id: string, voteKind: VoteKind) => {
    return Promise.all([
      mutator('/votes', {
        image_id: id,
        value: voteKind,
      }),
      voteKind === VoteKind.Like && mutator('/favourites', {
        image_id: id,
      }),
    ]);
  };
};

export const useCat = (offset: number) => {
  const [result, setResult] = useState<ICat[]>();
  const [page, setPage] = useState(0);
  const {
    data,
    error,
    mutate: refetch,
  } = useSWR<ICatResponse>('/images/search?limit=10');

  useEffect(() => {
    if (offset >= page * LoadPerRequest + LoadPerRequest * Threshold) {
      refetch();
      setPage(page + 1);
    }

    if (result) {
      FastImage.preload(result.slice(offset + 1, offset + 3).map(x => ({
        uri: x.url
      })));
    }
  }, [offset, page, result]);
  useEffect(() => {
    if (!data) return;

    setResult(result => [...(result || []), ...data]);
  }, [data]);

  return [
    result?.[offset - 1] || {} as ICat,
    result?.[offset] || {} as ICat,
    result?.[offset + 1] || {} as ICat
  ];
};
