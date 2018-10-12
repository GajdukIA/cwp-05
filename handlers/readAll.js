const articles = require('../articles.json');
const fs = require('fs');
const log = require('../logging');

module.exports.readAll = function (req, res, payload, cb) {

    log.log(req.url, JSON.stringify(payload));
    cb(null, articles);

}
