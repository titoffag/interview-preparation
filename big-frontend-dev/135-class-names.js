function classNames(...args) {
  const classes = args.flat(Infinity).reduce((acc, cur) => {
    if (cur == undefined) {
      return acc;
    }

    switch (typeof cur) {
      case 'string':
      case 'number': {
        acc.push(cur);
        return acc;
      };
      case 'object': {
        Object.entries(cur).forEach(([key, value]) => {
          if (value) {
            acc.push(key);
          }
        });
        return acc;
      }
    }

    return acc;
  }, []);

  return classes.join(' ');
}

function classNamesAlt(...args) {
  return args
    .flat(Infinity)
    .filter(val => val && ['object', 'number', 'string'].includes(typeof val))
    .flatMap(val =>
      typeof val == 'object'
        ? Object.keys(val).filter(p => !!val[p])
        : val
    )
    .join` `
}