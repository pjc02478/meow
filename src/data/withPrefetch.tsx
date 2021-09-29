import { AsyncStorage } from 'react-native';

import { IData, IInfiniteDataProvider } from 'data';

const prefecthData = {
} as Record<string, any[]>;

const cacheKey = (dataProvider: new () => any) => {
  return `__cache_${dataProvider.name}`;
};

export const prefetchFirstPage = async <T extends IInfiniteDataProvider<TData>, TData extends IData>(
  dataProvider: new () => T,
  pageSize: number,
) => {
  const instance = new dataProvider();

  try {
    const data = await instance.get(pageSize, 0);
    prefecthData[cacheKey(dataProvider)] = data;
  } catch(e) {
    console.error(e);
  }
};
export const withPrefetch = <T extends IInfiniteDataProvider<TData>, TData extends IData>(
  dataProvider: new () => T,
) => {
  const instance = new dataProvider();
  const key = cacheKey(dataProvider);

  return class EnhancedDataProvider implements IInfiniteDataProvider<TData> {
    async get(pageSize: number, page: number) {
      if (!!prefecthData[key] && page === 0)
        return prefecthData[key].slice(0, pageSize);
      return await instance.get(pageSize, page);
    }
    async remove(id: number) {
      return await instance.remove(id);
    }
  };
};
