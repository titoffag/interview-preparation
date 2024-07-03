function getLastCommonCommitMessage(commits, branches) {
    if (commits.length === 0) throw new Error('No common commit');
    
    const commitMap = new Map();
    for (const commit of commits) {
        commitMap.set(commit.id, commit);
    }

    function getCommitsForBranch(branch) {
        const branchCommits = new Set();
        for (const commit of commits) {
            if (commit.branches && commit.branches.includes(branch)) {
                const stack = [commit];
                while (stack.length > 0) {
                    const current = stack.pop();
                    if (!branchCommits.has(current.id)) {
                        branchCommits.add(current.id);
                        if (current.parents) {
                            for (const parentId of current.parents) {
                                if (commitMap.has(parentId)) {
                                    stack.push(commitMap.get(parentId));
                                }
                            }
                        }
                    }
                }
            }
        }
        return branchCommits;
    }

    const [branch1, branch2] = branches;
    const branch1Commits = getCommitsForBranch(branch1);
    const branch2Commits = getCommitsForBranch(branch2);

    const commonCommits = [...branch1Commits].filter(commit => branch2Commits.has(commit));
    
    if (commonCommits.length === 0) throw new Error('No common commit');
    
    let lastCommonCommit = null;
    for (const commitId of commonCommits) {
        const commit = commitMap.get(commitId);
        if (!lastCommonCommit || commit.timestamp > lastCommonCommit.timestamp) {
            lastCommonCommit = commit;
        }
    }

    return lastCommonCommit.message || '';
}

module.exports = {getLastCommonCommitMessage};
