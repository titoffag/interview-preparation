const myNew = (constructor, ...args) => {
  const instance = {};
  Object.setPrototypeOf(instance, constructor.prototype);
  const returned = constructor.call(instance, ...args);

  if (typeof returned === 'object') {
    return returned;
  }

  return instance;
}

const myNewAlt = (constructor, ...args) => {
  const instance = Object.create(constructor.prototype);
  const returned = constructor.call(instance, ...args);

  if (typeof returned === 'object') {
    return returned;
  }

  return instance;
}
