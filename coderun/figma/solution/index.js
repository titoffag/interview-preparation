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
    FRAME: (node) => `<div>${node.children ? node.children.map(traverse).join('') : ''}</div>`,
    RECTANGLE: (node) => `<div style="width: ${node.absoluteBoundingBox.width}px; height: ${node.absoluteBoundingBox.height}px;"></div>`,
    // DOCUMENT: (node) => `<html>${traverse(node.children)}</html>`,
    // CANVAS: (node) => `<body>${traverse(node.children)}</body>`,
    // VECTOR: (node) => `<svg>${node.children ? traverse(node.children) : ''}</svg>`,
    // ELLIPSE: (node) => `<circle cx="${node.center.x}" cy="${node.center.y}" r="${node.radius}"></circle>`,
    // POLYGON: (node) => `<polygon points="${node.points.map(point => `${point.x},${point.y}`).join(' ')}"></polygon>`,
    // GROUP: (node) => `<div>${traverse(node.children)}</div>`
};

const parse = (entry) => {
    return entry.children.map(traverse).join('');
};

const traverse = (node) => {
    if (!node) return '';

    let html = '';

    if (PRIMITIVES[node.type]) {
        html += PRIMITIVES[node.type](node);
    }

    // if (node.children) {
    //     node.children.forEach(child => {
    //         html += traverse(child);
    //     });
    // }

    return html;
};

module.exports = function (json) {
    const entry = json.document.children[0];
    return parse(entry);
};
