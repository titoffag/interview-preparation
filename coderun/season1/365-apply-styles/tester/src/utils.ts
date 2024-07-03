import { ElementNode, HtmlNode } from './types.js';

function runForAllNodes(node: HtmlNode, fn: (node: ElementNode) => void) {
    if (node.type === 'ELEMENT') {
        fn(node);
        node.children.forEach(child => runForAllNodes(child, fn));
    }
}

function getAllAttributes(html: HtmlNode): string[] {
    const attributes = [];

    runForAllNodes(html, node => {
        attributes.push(...Object.keys(node.styles));
    })

    return [...new Set(attributes)];
}

export function applyDefaults(html: HtmlNode): HtmlNode {
    const attributes = getAllAttributes(html);

    const defaultStyles = Object.fromEntries(attributes.map(e => [e, 'initial']));

    runForAllNodes(html, node => {
        node.styles = { ...defaultStyles, ...node.styles };
    })

    return html;
}
