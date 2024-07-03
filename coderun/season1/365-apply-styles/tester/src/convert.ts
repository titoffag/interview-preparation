import { CssRule, HtmlNode } from './types.js';

function convertToCss(rules: Array<CssRule>): string {
    return rules.map(rule => [
        `${rule.selector} {`,
        ...Object.keys(rule.declarations).map(key => `\t${key}: ${rule.declarations[key]};`),
        '}'
    ]).flat().join('\n');
}

function convertToHtml(node: HtmlNode): string {
    if (node.type === 'ELEMENT') {
        const style = Object.keys(node.styles).map(key => `${key}: ${node.styles[key]};`).join(' ')

        return `<${node.tag} style="${style}">${node.children.map(e => convertToHtml(e)).join('\n')}</${node.tag}>`;
    } else {
        return node.text;
    }
}

export function convert(node: HtmlNode, rules: Array<CssRule>): string {
    const html = convertToHtml(node);
    const css = convertToCss(rules);

    const style = `<style>\n${css}\n</style>`;

    return [html, style].join('\n');
}
