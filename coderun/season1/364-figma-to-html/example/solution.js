const TEXT_STYLES_MAPPER = {
    fontSize: (value) => `font-size: ${value}px;`,
    fontWeight: (value) => `font-weight: ${value};`,
    textAlignHorizontal: (value) => `text-align: ${value.toLowerCase()};`,
}

const buildBlock = ({ type, content, className, style }) => {
    return `<${type} class="${className}" style="${style}">${content}</${type}>`;
};

const getTextStyles = (node) => {
    const styleArr = [];
    if (node.style) {
        for (let [key, value] of Object.entries(node.style)) {
            if (TEXT_STYLES_MAPPER[key]) {
                styleArr.push(TEXT_STYLES_MAPPER[key](value));
            }
        }
    }
    return styleArr.join(' ');
}

const PRIMITIVES = {
    TEXT: (node) => {
        return buildBlock({
            type: 'span',
            content: node.characters,
            className: node.type,
            style: getTextStyles(node),
        });
    },
};

const parse = (entry) => {
    return traverse(entry.children[0]);
};

const traverse = (node) => {
    // тут надо придумать, как обходить дерево:)
    return PRIMITIVES[node.type](node);
};

module.exports = function (json) {
    const entry = json.document.children[0];
    return parse(entry);
};
