import { convert } from './convert.js';
import { applyDefaults } from './utils.js';
import apply from './main.js';
import { CssRule, HtmlNode } from './types.js';
import { css, html } from './defaults.js';

const onDomContentLoaded = () => {
    const htmlInput = document.querySelector('#htmlInput') as HTMLTextAreaElement;
    const cssInput = document.querySelector('#cssInput') as HTMLTextAreaElement;
    const referenceOutput = document.querySelector('.referenceOutput');
    const scriptOutput = document.querySelector('.scriptOutput');

    referenceOutput.attachShadow({ mode: 'open'})
    scriptOutput.attachShadow({ mode: 'open'})

    htmlInput.value = JSON.stringify(html, null, 4);
    cssInput.value = JSON.stringify(css, null, 4);

    const onInput = () => {
        try {
            const newHtml = JSON.parse(htmlInput.value) as HtmlNode;
            const newCss = JSON.parse(cssInput.value) as Array<CssRule>;

            referenceOutput.shadowRoot.innerHTML = convert(newHtml, newCss);

            const scriptResult = apply(newHtml, newCss);

            scriptOutput.shadowRoot.innerHTML = convert(applyDefaults(scriptResult), []);
        }
        catch {

        }
    }

    onInput();

    htmlInput.addEventListener('input', onInput);
    cssInput.addEventListener('input', onInput);
};

document.addEventListener('DOMContentLoaded', onDomContentLoaded);
