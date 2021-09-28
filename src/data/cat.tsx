import { useEffect, useState } from 'react';
import FastImage from 'react-native-fast-image';
import useSWR, { useSWRConfig } from 'swr';

import { IBookmark, ICat, VoteKind } from 'model';
import { mutator } from './fetcher';

const LoadPerRequest = 10;
const Threshold = 0.7;

interface ICatResponse extends Array<ICat> {
};
interface IBookmarkResponse extends Array<IBookmark>{
};

export const useBookmarkedCats = () => {
  const {
    data,
    error,
  } = useSWR<IBookmarkResponse>('/favourites');

  console.log('fav', data);

  return data;
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

  console.log(data);

  useEffect(() => {
    if (offset >= page * LoadPerRequest + LoadPerRequest * Threshold) {
      refetch();
      setPage(page + 1);
    }

    if (result) {
      FastImage.preload(result!.slice(offset, offset + 2).map(x => ({
        uri: x.url
      })));
    }
  }, [offset, page, result]);
  useEffect(() => {
    if (!data) return;

    setResult(result => [...(result || []), ...data]);
  }, [data]);

  console.log(result, offset);

  return result?.[offset] || {} as ICat;
/*
  return {
    data,
    error,
  };
  */
};
