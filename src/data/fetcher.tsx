import { mutate } from 'swr';
import { API_ENDPOINT, API_KEY } from 'react-native-dotenv';

const Endpoint = API_ENDPOINT || 'https://api.thecatapi.com/v1';
const ApiKey = API_KEY;

export const mutator = async (url: string, body: Record<string, any>) => {
  const response = await (await fetch(Endpoint + url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      ['Content-Type']: 'application/json',
      ['x-api-key']: ApiKey!,
    },
  })).json();
  await mutate(url);
  return response;
};
export const fetcher = async (url: string, init?: RequestInit) => {
  return await (await fetch(Endpoint + url, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      ['x-api-key']: ApiKey!,
    },
  })).json();
};
