function format(str: string, obj: Record<string, unknown>) {
  return str.replace(/\${(.+?)}/g, (_, expr: string) => {
    return Function(...Object.keys(obj) , `return ${expr}`)(...Object.values(obj));
  });
}

const res = format('Hello ${name}! May age is ${age * 2}.', {name: 'Bob', age: 12}); // 'Hello Bob! My age is 24.'

console.log(res);
