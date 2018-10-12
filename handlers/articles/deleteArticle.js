const articles = require('../../articles');
const fs = require('fs');
const valid = require('../../validation');
const error = {
    "code": 400,
    "message": "Request invalid"
};
const log = require('../../logging');

module.exports.deleteArt = function (req, res, payload, cb) {

    if (valid.valid(req.url, payload) === true) {
        let id = payload.id;

        let ind = articles.findIndex(i => i.id === id);
        if (ind !== -1) {
            articles.splice(ind, 1);
        }
        fs.writeFile('articles.json', JSON.stringify(articles), (err) => {
            if (err) throw err;
            console.log('updated articles.json');
        });
        let result = "deleted an article";
        cb(null, result);
        log.log(req.url, JSON.stringify(payload));
    } else {
        cb(error);
    }

}