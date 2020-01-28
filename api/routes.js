const controllers = require('./controllers');

module.exports = function(app){
    app.route('/about')
        .get(controllers.about)
}