/**
 * @param {() => Promise<any>} fetcher
 * @param {number} maximumRetryCount
 * @return {Promise<any>}
 */
function fetchWithAutoRetry(fetcher, maximumRetryCount) {
  return new Promise((resolve, reject) => {
    let fetch = fetcher();
    for (let attempts = 0; attempts < maximumRetryCount; attempts++) {
      fetch = fetch
        .then(resolve)
        .catch(() => {
          return fetcher();
        });
    }

    fetch.catch(reject);
  })
}

function fetchWithAutoRetryAlt(fetcher, maximumRetryCount) {
  return fetcher().catch((e) => {
    if (!maximumRetryCount) {
      throw e;
    } else {
      return fetchWithAutoRetry(fetcher, maximumRetryCount - 1);
    }
  })
}