const models = require('../models');

const FetchNews = async function (req, res, next) {
    try {

        const news = await models.newsHelper.News.find({});
        if (news.length > 0)
            return res.json({
                error: false, data: news.map(n => {
                    return {
                        title: n.title,
                        content: n.content,
                        url: n.url,
                        publishDate: n.publishDate,
                        keywords: n.keywords
                    }
                })
            });

        res.json({ error: false, data: null });
    } catch (error) {
        res.json({ error: true, message: error.message })
    }
}

module.exports = FetchNews;