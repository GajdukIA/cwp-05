const articles = require('../../articles');
const fs = require('fs');
const log = require('../../logging');

module.exports.updateArt = function (req, res, payload, cb) {

    let id = payload.id;

    for (let i = 0; i < articles.length; i++) {
        if (articles[i].id === id) {
            articles[i].title !== undefined ? articles[i].title = payload.title : "";
            articles[i].text !== undefined ? articles[i].text = payload.text : "";
            articles[i].date !== undefined ? articles[i].date = payload.date : "";
            articles[i].author !== undefined ? articles[i].author = payload.author : "";
            fs.writeFile('articles.json', JSON.stringify(articles), (err) => {
                if (err) throw err;
                console.log('updated articles.json');
            });
            cb(null, articles);
            log.log(req.url, payload);
        }
    }

}