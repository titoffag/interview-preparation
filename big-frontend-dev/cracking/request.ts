import { Observable, throwError, timer, of } from 'rxjs';
import { ajax, AjaxRequest, AjaxResponse } from 'rxjs/ajax';
import { retryWhen, mergeMap, catchError, map } from 'rxjs/operators';

interface RequestOptions<T> {
  api: string;
  body?: T;
  method?: string;
  headers?: Object;
  responseType?: string;
}
interface RetryStrategyOptions {
  maxRetryAttempts?: number;
  scalingDuration?: number;
  excludedStatusCodes?: number[];
}

const genericRetryStrategy = ({
  maxRetryAttempts = 3,
  scalingDuration = 1000,
  excludedStatusCodes = []
}: RetryStrategyOptions = {}) => (attempts: Observable<any>) => {
  return attempts.pipe(
    mergeMap((error, i) => {
      const retryAttempt = i + 1;
      if (
        retryAttempt > maxRetryAttempts ||
        excludedStatusCodes.find(e => e === error.status)
      ) {
        return throwError(error);
      }
      console.log(
        `Attempt ${retryAttempt}: retrying in ${
          retryAttempt * scalingDuration
        }ms`
      );
      return timer(retryAttempt * scalingDuration);
    })
  );
};

const isDevMode = process.env.NODE_ENV !== 'production';

export function request<T = any>({
  api,
  body,
  method = 'GET',
  headers = {
    'Content-Type': 'application/json'
  },
  responseType = 'json',
  ...options
}: RequestOptions<T> & AjaxRequest): Observable<AjaxResponse> {
  return ajax({
    url: `http://localhost:${isDevMode ? 3004 : 62044}/${api}`,
    method,
    responseType,
    headers,
    body,
    ...options
  }).pipe(
    retryWhen(
      genericRetryStrategy({
        maxRetryAttempts: 5,
        scalingDuration: 2000,
        excludedStatusCodes: [500]
      })
    ),
    map(result => result.response),
    catchError(error => of(error))
  );
}
