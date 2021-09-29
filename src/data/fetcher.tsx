import { mutate } from 'swr';
import { API_ENDPOINT, API_KEY } from 'react-native-dotenv';

const Endpoint = String(API_ENDPOINT) || 'https://api.thecatapi.com/v1';
const ApiKey = String(API_KEY);

type ErrorHandler = (e: any, retry: () => void, reject: () => void) => void;

export enum HttpMethods {
  Get = 'GET',
  Post = 'POST',
  Patch = 'PATCH',
  Delete = 'DELETE',
};

const fetchJson = async (input: RequestInfo, init?: RequestInit | undefined) => {
  const resp = await fetch(input, init);
  if (resp.status >= 400)
    throw new Error(await resp.text());
  return await resp.json();
};

export const mutator = async (
  url: string,
  body: Record<string, any>,
  method?: HttpMethods,
  errorHandler?: ErrorHandler,
) => {
  try {
    const response = await fetchJson(Endpoint + url, {
      method: method || 'POST',
      body: JSON.stringify(body),
      headers: {
        ['Content-Type']: 'application/json',
        ['x-api-key']: ApiKey!,
      },
    });
    await mutate(url);
    return response;
  } catch(e) {
    return new Promise((resolve, reject) => {
      if (!errorHandler)
        reject(e);

      errorHandler?.(e, async () => {
        try {
          resolve(
            await mutator(url, body, method, errorHandler),
          );
        } catch(e) {
          reject(e);
        }
      }, () => {
        reject(e);
      });
    });
  }
};
export const fetcher = async (url: string, init?: RequestInit) => {
  return await fetchJson(Endpoint + url, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      ['x-api-key']: ApiKey!,
    },
  });
};
