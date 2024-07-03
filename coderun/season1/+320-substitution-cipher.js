/**
 * 
 * @typedef Replace
 * 
 * @property {string} from
 * @property {string} to
 */

/**
 * 
 * @param {string} message 
 * @param {Replace[]} replaces 
 * @returns {string}
 */

function decode(message, replaces) {
    if (replaces.length === 0) {
        return message;
    }
    
    let result = '';
    let i = 0;

    while (i < message.length) {
        let replaced = false;

        for (let j = replaces.length - 1; j >= 0; j--) {
            const { from, to } = replaces[j];
            if (message.startsWith(from, i)) {
                result += to;
                i += from.length;
                replaced = true;
                break;
            }
        }

        if (!replaced) {
            result += message[i];
            i++;
        }
    }

    return result;
}

module.exports = { decode };
