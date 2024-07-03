/**
 * @param {PullRequest[]} pullRequests массив PR, отсортированных по времени создания
 * @returns {string[]} идентификаторы реквестов в порядке мёржа
 */
module.exports = function (pullRequests) {
    pullRequests.sort((a, b) => {
        if (b.files.length === a.files.length) {
            return a.created - b.created;
        }
        return b.files.length - a.files.length;
    });

    const mergedPRs = [];
    const mergedFiles = new Set();

    for (const pr of pullRequests) {
        const hasConflict = pr.files.some(file => mergedFiles.has(file));
        if (!hasConflict) {
            mergedPRs.push(pr.id);
            pr.files.forEach(file => mergedFiles.add(file));
        }
    }

    mergedPRs.sort((a, b) => {
        const prA = pullRequests.find(pr => pr.id === a);
        const prB = pullRequests.find(pr => pr.id === b);
        return prA.created - prB.created;
    });

    return mergedPRs;
}