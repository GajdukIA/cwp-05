const articles = require('../../articles');
const fs = require('fs');
const valid = require('../../validation');
const error = {
    "code": 400,
    "message": "Request invalid"
};
const log = require('../../logging');

module.exports.deleteComm = function (req, res, payload, cb) {

    if (valid.valid(req.url, payload) === true) {
        let id = payload.id;

        for (let i = 0; i < articles.length; i++) {
            let indOfComment = articles[i].comments.findIndex(j => j.id === id);
            if (indOfComment !== -1) {
                articles[i].comments.splice(indOfComment, 1);
                let result = 'deleted a comment';
                fs.writeFile('articles.json', JSON.stringify(articles), (err) => {
                    if (err) throw err;
                    console.log('updated articles.json');
                });
                cb(null, result);
                log.log(req.url, payload);
            }
        }
    } else {
        cb(error);
    }

}