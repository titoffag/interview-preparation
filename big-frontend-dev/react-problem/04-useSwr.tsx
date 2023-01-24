import React from 'react';

type LikePromise<T> = T | Promise<T>;

export function useSWR<T = any, E = any>(
  _key: string,
  fetcher: () => LikePromise<T>
): {
  data?: T
  error?: E
} {
  const fetchResult = fetcher();
  const initialState = fetchResult instanceof Promise ? undefined : fetchResult;
  const [data, setData] = React.useState<T | undefined>(initialState);
  const [error, setError] = React.useState<E | undefined>();

  React.useEffect(() => {
    Promise.resolve(fetchResult)
      .then(
        (data: T) => setData(data), 
        (error: E) => setError(error)
      );
  }, []);

  return {
    data,
    error,
  }
}
