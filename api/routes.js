const controllers = require('./controllers');

module.exports = function (app) {
    app.route('/about')
        .get(controllers.about)

    app.route('/fetch')
        .get(controllers.fetch)
    
    app.route('/refresh')
        .get(controllers.refresh)
}

