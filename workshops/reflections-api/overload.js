function overload(fns) {
    const fnsMap = {};
    fns.forEach((fn) => {
        fnsMap[fn.length] = fn;
    });

    return function (...args) {
        // TODO: add overloading by argument types
        if (!(args.length in fnsMap)) {
            throw new Error('No such overload');
        }
        return fnsMap[args.length].call(this, ...args);
    }
}