export type CssRule = {
    selector: string;
    declarations: Record<string, string>;
}

export type TextNode = {
    type: 'TEXT';
    text: string;
}

export type ElementNode = {
    type: 'ELEMENT'
    styles: Record<string, string>;
    tag: string;
    children: Array<ElementNode | TextNode>;
}

export type HtmlNode = ElementNode | TextNode;
