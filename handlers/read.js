const articles = require('../articles');
const valid = require('../validation');
const error = {
    "code": 400,
    "message": "Request invalid"
};
const log = require('../logging');

module.exports.read = function (req, res, payload, cb) {

    if (valid.valid(req.url, JSON.stringify(payload)) == true) {
        let id = payload.id;
        let result;
        articles.forEach(article => {
            if (article.id === id) {
                result = article;
            }
        })
        cb(null, result);
        log.log(req.url, payload);
    } else {
        cb(error);
    }

}