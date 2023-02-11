function serialize(obj: unknown): string {
  return JSON.stringify(obj, (_, value: unknown) => {
    if (value instanceof Date) {
      return `Data:Date;${value}`
    }
    if (value instanceof Set || value instanceof Map) {
      const constructorName = value.constructor.name;
      return `Data:${constructorName};${serialize([...value])}`;
    }

    return value;
  });
}

function parse(str: string): object {
  return JSON.parse(str, (_, value: unknown) => {
    if (typeof value == 'string' && value.startsWith('Data:')) {
      const [_, type, data] = /^Data:(.*?);(.*)/.exec(value) ?? [];
      return Function('data', `return new ${type}(data)`)(parse(data));
    }

    return value;
  });
}

const original = {
  myDate: new Date(),
  mySet: new Set([1, 2, 3]),
  myMap: new Map([
    [new Date(), {a: 1}]
  ])
};

const str = serialize(original);
console.log(str);
// Объект должен иметь аналогичную структуру с original
console.log(parse(str));
