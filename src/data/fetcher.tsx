import { mutate } from "swr";

const Endpoint = process.env.API_ENDPOINT || 'https://api.thecatapi.com/v1';
const ApiKey = process.env.API_KEY;

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
