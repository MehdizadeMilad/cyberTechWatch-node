const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const News = new Schema({
    title: { type: String, required: true },
    content: { type: String },
    keywords: { type: String },
    origin: { type: String },
    url: { type: String, unique: true },
    publishDate: { type: Date }
}, { timestamps: true });

// Prevent Duplicate insertion
News.pre('save', true, function (next, done) {
    mongoose.models['News'].countDocuments({ url: this.url }, function (err, count) {
        if (err) done(err);
        if (count === 0) done();
    });
    next();
});

const dbHelper = {
    News: mongoose.model('News', News),

    addNews: (NewsModel) => {
        return new Promise((resolve, reject) => {
            NewsModel.save().then(doc => {
                resolve(true);
            });
        });
    }
}

module.exports = dbHelper;