const {getHashByData, fetchData} = require('./utils');

module.exports = async function(urls, retryCount) {
    async function fetchDataWithRetries(url, retries) {
        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                const {data, hashSum} = await fetchData(url);
                let calculatedHash = await new Promise((resolve) => {
                    getHashByData(data, (hash) => resolve(hash));
                });
                
                if (calculatedHash === hashSum) {
                    return data;
                }
            } catch (error) {
                // Continue to retry
            }
        }
        return null; // If all retries failed, return null
    }

    const results = await Promise.all(urls.map(url => fetchDataWithRetries(url, retryCount)));

    return results.filter(result => result !== null);
}
