type Milliseconds = number;

interface Options {
  retry: number,
  delay: (countRetry: number) => Milliseconds,
}

function retry<T>(callback: () => Promise<T>, opts: Options = {retry: 5, delay: (n) => n * 200}): Promise<T> {
  const {retry, delay} = opts;
  let countRetries = 0;

  return new Promise((resolve, reject) => {
    execute();

    function doRetry(reason: Error) {
      if (++countRetries >= retry) {
        reject(reason);
        return;
      }

      const waitInMs = delay(countRetries);
      setTimeout(execute, waitInMs);
    }

    function execute() {
      try {
        Promise.resolve(callback())
          .then(resolve)
          .catch((reason) => doRetry(reason));
      } catch (reason) {
        doRetry(reason);
      }
    }
  });
}

retry(() => fetch('//some-data'), {retry: 3, delay: (n) => n * 1000}).then(console.log, console.error);
