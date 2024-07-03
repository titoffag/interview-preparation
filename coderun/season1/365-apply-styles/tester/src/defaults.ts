import { HtmlNode } from './types';

export const html: HtmlNode = {
    "type": "ELEMENT",
    "tag": "parent",
    "styles": {},
    "children": [
        {
            "type": "TEXT",
            "text": "\n    "
        },
        {
            "type": "ELEMENT",
            "tag": "tag",
            "styles": {},
            "children": [
                {
                    "type": "TEXT",
                    "text": "text"
                }
            ]
        },
        {
            "type": "TEXT",
            "text": "\n"
        }
    ]
};

export const css = [
    {
        "selector": "parent",
        "declarations": {
            "color": "rgb(0, 255, 0)",
            "font-size": "15px"
        }
    },
    {
        "selector": "tag",
        "declarations": {
            "color": "rgb(255, 0, 0)"
        }
    }
];
