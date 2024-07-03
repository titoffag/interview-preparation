function solution(values) {
    const getType = (value) => {
        if (value === null) return 'null';
        if (value === undefined) return 'undefined';
        if (Array.isArray(value)) return 'array';
        return typeof value;
    };

    const processPrimitive = (values) => {
        const uniqueValues = Array.from(new Set(values));
        if (uniqueValues.length > 5) {
            return getType(uniqueValues[0]);
        }
        return uniqueValues.map(value => JSON.stringify(value)).join('|');
    };

    const processObjects = (values) => {
        const groups = {};

        values.forEach(obj => {
            const keys = Object.keys(obj).sort();
            const keySignature = keys.join('|');
            if (!groups[keySignature]) {
                groups[keySignature] = [];
            }
            groups[keySignature].push(obj);
        });

        const resultTypes = Object.values(groups).map(group => {
            const fieldTypes = {};
            group.forEach(obj => {
                Object.entries(obj).forEach(([key, value]) => {
                    const type = getType(value);
                    if (!fieldTypes[key]) {
                        fieldTypes[key] = new Set();
                    }
                    if (type === 'string' || type === 'number') {
                        fieldTypes[key].add(value);
                    } else {
                        fieldTypes[key].add(type);
                    }
                });
            });

            const typeString = Object.entries(fieldTypes).map(([key, types]) => {
                if (types.size > 5) {
                    return `${key}: ${getType([...types][0])}`;
                }
                return `${key}: ${Array.from(types).map(t => (typeof t === 'string' ? JSON.stringify(t) : t)).join('|')}`;
            }).join(', ');

            return `{ ${typeString} }`;
        });

        return resultTypes.join(' | ');
    };

    if (values.every(v => getType(v) !== 'object')) {
        return processPrimitive(values);
    } else {
        const primitives = values.filter(v => getType(v) !== 'object');
        const objects = values.filter(v => getType(v) === 'object');
        let result = '';

        if (primitives.length > 0) {
            result += processPrimitive(primitives);
        }

        if (objects.length > 0) {
            if (result) result += ' | ';
            result += processObjects(objects);
        }

        return result;
    }
}

module.exports = solution;