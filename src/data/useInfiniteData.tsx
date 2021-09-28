import React, { useState, useEffect, useMemo } from 'react';

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
  const [page, setPage] = useState(0);
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
      setResult(result => [...result, ...data]);
      setError(null);

      return true;
    } catch(e) {
      setError(e);

      return false;
    } finally {
      setLoading(false);
    }
  };
  const advance = async () => {
    const nextPage = page + 1;
    if (await fetchPage(nextPage))
      setPage(nextPage);
  };

  useEffect(() => {
    fetchPage(page);
  }, []);

  return {
    page,
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
