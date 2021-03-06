import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { uniqBy } from 'lodash';

export interface IData {
  id: number;
};
export interface IInfiniteDataProvider<TData extends IData> {
  get(pageSize: number, page: number): Promise<TData[]>;
  remove(id: number): Promise<void>;
};

interface UseInfiniteDataOptions {
  pageSize?: number;
};
export const useInfiniteData = <T extends IInfiniteDataProvider<TData>, TData extends IData>(
  dataProviderType: new () => T,
  options: UseInfiniteDataOptions = DefaultUseInfiniteDataOptions,
) => {
  const dataProvider = useMemo(() => new dataProviderType(), [dataProviderType]);
  const isFocused = useIsFocused();
  const [page, setPage] = useState(-1);
  const [result, setResult] = useState<TData[]>([]);
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(false);

  const removeItem = async (id: number) => {
    await dataProvider.remove(id);
    setResult(result => result.filter(x => x.id !== id));
  };
  const fetchPage = async (page: number) => {
    try {
      setLoading(true);

      const data = await dataProvider.get(
        options.pageSize || DefaultUseInfiniteDataOptions.pageSize!,
        page,
      );

      setResult(result => uniqBy([...result, ...data], 'id'));
      setError(null);

      return data.length > 0;
    } catch (e) {
      console.error(e);
      setError(e);

      return false;
    } finally {
      setLoading(false);
    }
  };
  const advance = async () => {
    const nextPage = page + 1;
    if (await fetchPage(nextPage)) {
      setPage(nextPage);
    }
  };

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    if (page >= 0) {
      fetchPage(page);
    }
  }, [isFocused]);
  useEffect(() => {
    advance();
  }, []);

  return {
    page: Math.max(0, page),
    data: result,
    loading,
    error,

    // mutators
    advance,
    retry: () => !!error && fetchPage(page),
    remove: removeItem,
  };
};

const DefaultUseInfiniteDataOptions = {
  pageSize: 45,
} as UseInfiniteDataOptions;
