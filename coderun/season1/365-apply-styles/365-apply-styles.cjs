/**
 * Processes an HTML node with a set of CSS rules.
 *
 * @param {Object} html - The HTML node to be processed.
 * @param {Array<Object>} css - An array of CSS rules to apply to the HTML node.
 * @returns {Object} - The processed HTML node.
 */
module.exports = function(html, css) {
    const cssMap = {};
    css.forEach(rule => {
        cssMap[rule.selector] = rule.declarations;
    });

    function apply(element, parentStyles = {}) {
        if (element.type === 'TEXT') {
            return;
        }

        const tagStyles = cssMap[element.tag] || {};
        element.styles = { ...parentStyles, ...tagStyles };

        if (element.tag in cssMap) {
            Object.assign(element.styles, cssMap[element.tag]);
        }

        element.children.forEach((child, index, children) => {
            apply(child, element.styles);

            if (index > 0) {
                const prevSibling = children[index - 1];
                if (prevSibling.type === 'ELEMENT') {
                    if (`${prevSibling.tag} + ${child.tag}` in cssMap) {
                        Object.assign(child.styles, cssMap[`${prevSibling.tag} + ${child.tag}`]);
                    }
                }
            }
            if (index > 0) {
                for (let i = 0; i < index; i++) {
                    const prevSibling = children[i];
                    if (prevSibling.type === 'ELEMENT') {
                        if (`${prevSibling.tag} ~ ${child.tag}` in cssMap) {
                            Object.assign(child.styles, cssMap[`${prevSibling.tag} ~ ${child.tag}`]);
                        }
                    }
                }
            }
        });

        function applyDescendantCombinator(parent, child) {
            if (child.type === 'ELEMENT') {
                if (`${parent.tag} ${child.tag}` in cssMap) {
                    Object.assign(child.styles, cssMap[`${parent.tag} ${child.tag}`]);
                }
                child.children.forEach(grandchild => {
                    applyDescendantCombinator(parent, grandchild);
                });
            }
        }

        element.children.forEach(child => {
            applyDescendantCombinator(element, child);
        });

        // Handle child combinator
        function applyChildCombinator(parent, child) {
            if (child.type === 'ELEMENT') {
                if (`${parent.tag} > ${child.tag}` in cssMap) {
                    Object.assign(child.styles, cssMap[`${parent.tag} > ${child.tag}`]);
                }
                child.children.forEach(grandchild => {
                    applyChildCombinator(child, grandchild);
                });
            }
        }

        element.children.forEach(child => {
            applyChildCombinator(element, child);
        });
    }

    apply(html);
    return html;
};
