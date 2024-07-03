function take(test: RegExp, opts?: {min?: number, token?: string}) {
    return test;
}

const ws = take(/\s/, {min: 0});

function seq(...regExp: RegExp[]) {
    return function(str: string) {
        return regExp;
    }
}

function tag(pattern: string, opts?: {min?: number, token?: string}) {
    return undefined;
}

const xmlAttr = seq(
    ws,
    take(/[^ <>"'=/]/, {token: 'CREATE_ATTR_KEY'}),
    ws,
    tag('='),
    ws,
    tag('"'),
    take(/"[^"]*"/, {token: 'CREATE_ATTR_VALUE'}),
    tag('"'),
);

function repeat(xmlAttr: (str: string) => Array<RegExp>, opts?: {min?: number, token?: string}) {
    return undefined;
}

const xmlTag = seq(
    ws,
    tag('<', {token: 'CREATE_TAG'}),
    ws,
    repeat(xmlAttr, {min: 0}),
    ws,
    tag('>', {token: 'END_CREATE_TAG'}),
    ws
);

const xmlEndTag = seq(
    ws,
    tag('</', {token: 'END_TAG'}),
    ws,
    tag('>'),
    ws
);

const xmlText = seq(
    ws,
    take(/[^<>]/, {token: 'TEXT'}),
    ws
);

function opt(param: (...args) => any) {
    return undefined;
}

function or(seq1: (str: string) => Array<RegExp>, xml: any) {
    return undefined;
}

const xml = repeat(
    seq(
        // @ts-ignore
        xmlTag,
        opt(
            (...args) =>
                or(
                    seq(
                        // @ts-ignore
                        xmlText,
                        xml,
                        opt(xmlText)
                    ),
                    xml
                )(...args)
        ),
        xmlEndTag
    ),
);

console.log([...xmlTag('<a b="c">d</a>')]);

function minimizeHtml(html: string) {
    let res = '';

    const tokens = xml(html);
    for (const token of tokens) {
        const val = token.value;
        switch (token.type) {
            case 'CREATE_ATTR_KEY':
                res += `${val}`;
                break;
            case 'CREATE_ATTR_VALUE':
                if (!/\s/.test(val)) {
                    res += `=${val}`;
                } else {
                    res += `="${val}"`;
                }
                break;
            case 'CREATE_TAG':
                res += `<${val}`;
                break;
            case 'END_CREATE_TAG':
                res += `>`;
                break;
            case 'END_TAG':
                res += `</${val}>`;
                break;
            case 'TEXT':
                res += val.replace(/(\s)\1+/g, '$1');
                break;
        }
    }

    return res;
}

const depth = or(
    seq(
        tag('\n'),
        take(
            / /, {
                token: 'DEPTH',
                tokenValue: (v) => v.length,
            }
        )
    ),
    ws,
);

const nl = tag('\n', {token: 'NEWLINE'});

const header = seq(
    depth,
    take(/#/, { token: 'HEADER', tokenValue: (v) => v.length }),
    ws,
    take(/[^\n]/, {  token: 'HEADER_VALUE' }),
);

const link = seq(
    depth,
    tag('['),
    take(/[^\]]/, { token: 'LINK_TEXT', tokenValue: (v) => v.length }),
    tag(']'),
    tag('('),
    take(/[^)\n]/, { token: 'LINK_VALUE', tokenValue: (v) => v.length }),
    tag(')'),
);

const ul = seq(
    depth,
    tag('*'),
    ws,
    take(/[^\n]/, { token: 'LI_LABEL' }),
);

const text = seq(
    depth,
    take(/[^\n]/, { token: 'TEXT' })
);

const md = repeat(or(header, link, ul, text, ws, nl));

function markdownToHtml(text: string) {
    const tokens = md(text);
    const doc = document.createDocumentFragment();
    const stack = [];
    let currentDepth = 0;

    for (const token of tokens) {
        const v = token.value;

        switch (token.type) {
            case 'HEADER':
                stack.push(document.createElement(`h${v}`));
                break;
            case 'HEADER_VALUE':
                stack.at(-1)!.innerHTML = v;
                doc.append(stack.pop()!);
                break;
            case 'LINK_TEXT':
                const a = document.createElement('a');
                a.innerHTML = v;
                stack.push(a);
                break;
            case 'LINK_VALUE':
                stack.at(-1)!.setAttribute('href', v);
                doc.append(stack.pop()!);
                break;
            case 'LI_LABEL':
                stack.push(document.createElement('li'));
                break;
            case 'TEXT':
                stack.at(-1)!.innerHTML = v;
                doc.append(stack.pop()!);
                break;
            case 'DEPTH':
                if (v < currentDepth) {
                    while (currentDepth > v) {
                        doc.append(stack.pop()!);
                        currentDepth--;
                    }
                }
        }
    }

    return doc;
}

function beatifyJson(text: string) {
    // return JSON.stringify(JSON.parse(json), null, 4);
    const tokens = json(text);
    let res = '';
    let depth = 0;
    const stack = [];

    // TODO: буферизированный добавить чтоб смотреть что дальше идет

    for (const token of tokens) {
        const v = token.value;
        switch (token.type) {
            case 'CREATE_OBJECT':
            case 'CREATE_ARRAY':
                res += `${v}\n`;
                // 2 or 4
                depth += 2;
                break;
            case 'END_OBJECT':
            case 'END_ARRAY':
                depth -= 2;

                // TODO: bad practice
                if (res.endsWith(',\n')) {
                    res = res.slice(0, -2) + '\n';
                }

                res += `${' '.repeat(depth)}${v}\n`;
                break;
            case 'OBJECT_KEY':
                res += `${' '.repeat(depth)}${v}: `;
                break;
            case 'STRING_VALUE':
            case 'INT_VALUE':
            case 'BOOLEAN_VALUE':
                res += `${' '.repeat(depth)}${v},\n`;
                break;
        }
    }


    return res;
}

// подсветка синтаксиса также как beatifyJson тока со span class="token"
function highlight(text) {
    return beatifyJson(text);
}

document.body.append(highlight('{"a": 1, "b": [1, 2, {"c": 3}]}'))

// contenteditable = true
