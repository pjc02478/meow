import React, { useState, useEffect, useMemo } from 'react';

interface IData {
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
  page: number,
  options: UseInfiniteDataOptions = DefaultUseInfiniteDataOptions,
) => {
  const dataProvider = useMemo(() => new dataProviderType(), [dataProviderType]);
  const [result, setResult] = useState<TData[]>([]);
  const [loading, setLoading] = useState(false);

  const removeItem = async (id: number) => {
    await dataProvider.remove(id);
    setResult(result => result.filter(x => x.id !== id));
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await dataProvider.get(
          options.pageSize || DefaultUseInfiniteDataOptions.pageSize!,
          page,
        );
        setResult(result => [...result, ...data]);
      } finally {
        setLoading(false);
      }
    })();
  }, [page]);

  return {
    data: result,
    loading,

    // mutators
    remove: removeItem,
  };
};

const DefaultUseInfiniteDataOptions = {
  pageSize: 45,
} as UseInfiniteDataOptions;
