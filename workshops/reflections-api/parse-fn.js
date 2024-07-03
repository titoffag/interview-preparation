function parse(fn) {
    const code = fn.toString();

    return {
        name: fn.name,
        // TODO: parser combinator for ES6 syntax arguments
        // function foo({a, b} = {a: 1, b: 2}, ...args) {}
        // var foo = (...args) => {}
        // var foo = arg => {}
        // [1] - extract arguments using a memorable group
        arguments: code.match(/\((.*?)\)\s*{/)?.[1].split(/\s*, \s*/).map(arg => arg.trim()) ?? [],
        native: /\[native code]/.test(fn.toString())
    }
}