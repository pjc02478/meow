import { AsyncStorage } from 'react-native';

import { IData, IInfiniteDataProvider } from 'data';

const prefecthData = {
} as Record<string, any[]>;

export const prefetchFirstPage = async <T extends IInfiniteDataProvider<TData>, TData extends IData>(
  dataProvider: new () => T,
  pageSize: number,
) => {
  const instance = new dataProvider();
  const cacheKey = `__cache_${dataProvider.name}`;

  try {
    const data = await instance.get(pageSize, 0);
    prefecthData[cacheKey] = data;
  } catch(e) {
    console.error(e);
  }
};

export const withPrefetch = <T extends IInfiniteDataProvider<TData>, TData extends IData>(
  dataProvider: new () => T,
) => {
  const instance = new dataProvider();
  const cacheKey = `__cache_${dataProvider.name}`;

  return class EnhancedDataProvider implements IInfiniteDataProvider<TData> {
    async get(pageSize: number, page: number) {
      if (!!prefecthData[cacheKey])
        return prefecthData[cacheKey].slice(0, pageSize);
      return await instance.get(pageSize, page);
    }
    async remove(id: number) {
      return await instance.remove(id);
    }
  };
};
