let pool = new Array(10).fill(0).map((_, idx) => ({
  message: `promise number #${idx}`,
  delay: idx,
}));

function process(idleRequestsPool, activeQuantity = 5) {
  const firstRequest = idleRequestsPool.splice(0, activeQuantity);
  const activeRequestsQueue = firstRequest;
  const complectedRequests = [];

  for (const forWork of activeRequestsQueue) {
    console.log(forWork);
    new Promise(
      (resolve) => setTimeout(() => resolve(forWork.message), forWork.delay * 1_000)
    ).then((result) => {
      console.log(`${result} is resolved`);
      complectedRequests.push(`${result} is resolved`);

      let [nextForWork] = idleRequestsPool.splice(0, 1);
      new Promise((resolve) => setTimeout(() => resolve(nextForWork.message), 1_000))
        .then((res) => {
          console.log(`${res} is resolved`);
          complectedRequests.push(`${res} is resolved`);
        })
    })
  }

  return complectedRequests;
}

let result = process(pool);
