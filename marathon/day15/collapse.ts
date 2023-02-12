function collapse(obj: unknown) {
  const result: Record<string, unknown> = {};

  (function traverse(obj: unknown, path?: string) {
    if (isObject(obj)) {
      const kvIterator = isIterable(obj) ? obj.entries() : Object.entries(obj);
      for (const [key, value] of kvIterator) {
        traverse(value, path == null ? String(key) : `${path}.${key}`);
      }
    } else {
      if (path == null) {
        throw new Error(`${path} should be defined`);
      }

      result[path] = obj;
    }
  })(obj);

  return result;

  function isObject(obj: unknown): obj is object {
    return typeof obj === "object" && obj !== null;
  }

  function isIterable(obj: object): obj is Map<unknown, unknown> | Set<unknown> {
    return obj instanceof Map || obj instanceof Set;
  }
}

const obj = {
  a: {
    b: [1, 2],
    "": { c: 2 },
    z: new Set([10, 11]),
    zz: new Map([
      ["key", { prop: "value" }],
      ["key2", { prop2: "value2" }],
    ]),
  },
};

/* {'a.b.0': 1, 'a.b.1': 2, 'a..c': 2} */
console.log(collapse(obj));
