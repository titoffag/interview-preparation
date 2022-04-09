function retry(fn, timeout) {
  let retries = 5;
  while (retries) {
    try {
      await fn();
      break;
    } catch (err) {
      console.error(err);
      retries -= 1;
      console.info(`retries left: ${retries}`);
      await new Promise(res => setTimeout(res, timeout);)
    }
  }
};
