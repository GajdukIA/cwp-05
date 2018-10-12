const articles = require('../../articles.json');
const fs = require('fs');
const valid = require('../../validation');
const error = {
    "code": 400,
    "message": "Request invalid"
};
const log = require('../../logging');

module.exports.createArt = function (req, res, payload, cb) {

    let seed = 1;
    let id = Date.now() + seed++;

    if (valid.valid(req.url, payload) === true) {
        payload.id = id;
        articles.push(payload);
        fs.writeFile('articles.json', JSON.stringify(articles), (err) => {
            if (err) throw err;
            console.log('updated articles.json');
        });
        cb(null, payload);
        log.log(req.url, JSON.stringify(payload));
    }else {
        cb(error);
    }

}