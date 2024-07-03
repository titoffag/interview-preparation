/*
{
  op: '+'
  children: [
    {type: 'number', value: 10},

    {
      op: '/'
      children: [
        {
          op: '*',
          children: [
            {type: 'variable', value: 'x'},
            {type: 'number', value: 15}
          ]
        },

        {
          op: '-',
          children: [
            {type: 'number', value: 4},
            {type: 'variable', value: 'y'}
          ]
        }
      ]
    }
  ]
}
*/

function infixParser(str: string) {
    // normalizing
    str = str.replace(/\s/g, '');

    // if (/\d+/.test(str)) {
    //     return NaN;
    // }

    const stack: string[] = [],
        queue: {op?: string, value?: number, children?: any[]}[] = [];

    const isOp: RegExp = /[+\-*/]/;

    const priority: Record<string, number> = {
        '(': -1,
        ')': -1,
        '+': 0,
        '-': 0,
        '*': 2,
        '/': 1,
    };

    // @ts-ignore flatMap target: es2019
    const lexems = str.split(/\b/).flatMap((el: string) => {
        if (/[+-/*()]/.test(el)) {
            return el.split('')
        }

        return el;
    });

    for (const char of lexems) {
        if (char == '(') {
            stack.push(char);
        } else if (char == ')') {
            while (stack.length > 0 && stack[stack.length - 1] != '(') {
                queue.push({ op: stack.pop(), children: [] });
            }
            stack.pop();
        } else if (isOp.test(char)) {
            while (stack.length > 0 && priority[stack[stack.length - 1]] >= priority[char]) {
                queue.push({ op: stack.pop(), children: [] });
            }
            stack.push(char);
        } else {
            queue.push({ value: +char, children: [] });
        }
    }

    while (stack.length > 0) {
        queue.push({ op: stack.pop(), children: [] });
    }

    console.log(queue);
}

const ast = infixParser('10 + x * 15 / (4 - y)');