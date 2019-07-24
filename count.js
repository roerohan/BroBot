const request = require('request');
const cheerio = require('cheerio');
var counts;
counter = function (message, api) {
    request.post({
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        url: 'https://devspace.csivit.com/regCount',
        body: "pass=bigbutt"
    }, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            counts = $("h1").first().text() + '\b' + $("#cnt").first().text() + '\b' + $("h1").last().text() +'\b' + $("#cnt").last().text();


            api.sendMessage({
                chat_id: message.chat.id,
                text: counts
            });


        }
    });
}

module.exports.counter = counter;
