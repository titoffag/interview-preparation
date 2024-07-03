module.exports = (str) => {
    const lines = str.trim().split('\n');

    const strategies = {
        header: (line) => `<h1>${line.slice(2).trim()}</h1>`,
        listItem: (line) => `<li>${line.slice(2).trim()}</li>`,
        paragraph: (line) => {
            line = line.replace(/\(\((.*?) (.*?)\)\)/g, '<a href="$1">$2</a>');
            return `<p>${line}</p>`;
        }
    };

    const htmlParts = [];
    const state = { inList: false };

    const processLine = (line, state) => {
        if (line.startsWith('= ')) {
            return strategies.header(line);
        } else if (line.startsWith('* ')) {
            return strategies.listItem(line);
        } else {
            return strategies.paragraph(line);
        }
    };

    const closeListIfNeeded = (state, htmlParts) => {
        if (state.inList) {
            htmlParts.push('</ul>');
            state.inList = false;
        }
    };

    for (let line of lines) {
        line = line.trim();
        if (line === '') {
            closeListIfNeeded(state, htmlParts);
            continue;
        }

        if (line.startsWith('* ')) {
            if (!state.inList) {
                htmlParts.push('<ul>');
                state.inList = true;
            }
        } else {
            closeListIfNeeded(state, htmlParts);
        }

        htmlParts.push(processLine(line, state));
    }

    closeListIfNeeded(state, htmlParts);

    return htmlParts.join('');
};
