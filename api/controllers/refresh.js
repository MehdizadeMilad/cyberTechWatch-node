const services = require('../../services');
const models = require('../models');
const News = models.newsHelper.News;

const RefreshNews = async function (req, res, next) {
    try {

        res.json({ error: false, message: 'ok' });

        const sources = models.newsSources;

        let promises = sources.map(async (src) => await services.RssParser(src.url));

        const allNewsItems = await Promise.all(promises)

        let itemsToSave = [];
        allNewsItems.forEach(currentSource => {
            currentSource.items.forEach(item => {
                itemsToSave.push(new News({
                    title: item.title,
                    content: item.contentSnippet,
                    url: item.link,
                    // keywords: item.keywords,
                    publishDate: item.pubDate,
                    origin: currentSource.title
                }));
            })
        });

        //TODO Categorise itemsToSave

        itemsToSave.forEach(async i => {
            if (!models.newsHelper.addNews(i))
                console.log('Save Failed');
        })
        console.log('saved to db!');
    }
    catch (err) {
        res.json({ error: true, message: err.message });
    }
};

module.exports = RefreshNews;