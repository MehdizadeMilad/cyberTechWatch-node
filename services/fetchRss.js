const Parser = require('rss-parser');

const parser = new Parser();

const rssParser = async function (url) {
    try {

        return new Promise((resolve, reject) => {
            try {
                let feed = parser.parseURL(url);
                resolve(feed);
            }
            catch (error) {
                reject(error);
            }
        })
    }
    catch (err) {
        return null;
    }
};

module.exports = rssParser;