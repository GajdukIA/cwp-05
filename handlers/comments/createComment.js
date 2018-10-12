const articles = require('../../articles.json');
const fs = require('fs');
const valid = require('../../validation');
const error = {
    "code": 400,
    "message": "Request invalid"
};
const log = require('../../logging');

module.exports.creatComment = function (req, res, payload, cb) {

    let seed = 1;
    let id = Date.now() + seed++;

    if (valid.valid(req.url, payload) === true) {
        let ind = articles.findIndex(i => i.id === payload.id || i.id === payload.articleId);
        if (ind != -1) {
            payload.id !== undefined ? payload.articleId = payload.id : payload.articleId = payload.articleId;
            payload.id = id;
            articles[ind].comments.push(payload);
            fs.writeFile('articles.json', JSON.stringify(articles), (err) => {
                if (err) throw err;
                console.log('updated articles.json');
            });
            cb(null, payload);
            log.log(req.url, payload);
        }
    } else {
        cb(error);
    }

}