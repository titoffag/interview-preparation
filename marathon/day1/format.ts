function format(str: string, obj: Record<string, unknown>) {
  return str.replace(/\${(.+?)}/g, (_, key: string) => {
    if (obj[key]) {
      return obj[key];
    }
    
    return eval(
      key.replace(/(\w+)/g, (_, key) => {
        if (obj[key]) {
          return obj[key];
        }

        return key;
      })
    );
  });
}

const res = format('Hello ${name}! May age is ${age * 2}.', {name: 'Bob', age: 12}); // 'Hello Bob! My age is 24.'

console.log(res);
